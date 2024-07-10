import { Request, Response } from "express";
import { Contact } from "../models/contactInterface";
import {
  checkIfAlreadyExists,
  createContact,
  findContactWithId,
  updateLinkedId,
  getAllContactsByPrimaryId,
  findAllContactsMatchingEmailOrPhone,
} from "../models/contact";

export const identifyContact = async (req: Request, res: Response): Promise<void> => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    res.status(400).json({
      message: "Please enter a email or a phoneNumber.",
    });
    return;
  }

  try {
    const existingContact: Contact | null = await checkIfAlreadyExists(email, phoneNumber);
    const matchingContacts = await findAllContactsMatchingEmailOrPhone(email, phoneNumber);

    let primaryContactId: number | null = null;

    if (existingContact != null) {
      //There already is a contact with same email and phone
      primaryContactId =
        existingContact.linkedId === null ? existingContact.id : existingContact.linkedId;
    } 
    else if (matchingContacts.length == 0) {
      //There are no contacts matching either email or phone
      const newContact: Contact = await createContact(email, phoneNumber, "primary", null);
      primaryContactId = newContact.id;
    } 
    else if (matchingContacts.length >= 1) {
      //There are more than one contact matching either email or phone
      const primaryContactIds: number[] = getPrimaryContactIds(matchingContacts);

      if (primaryContactIds.length == 1) {
        //Only 1 primary contact matched
        primaryContactId = primaryContactIds[0];
        await createContact(email, phoneNumber, "secondary", primaryContactId);
      } 
      else {
        // 2 primary contacts matched, merge them
        const primaryContactId1: number = primaryContactIds[0];
        const primaryContactId2: number = primaryContactIds[1];

        const primaryContact1: Contact = await findContactWithId(primaryContactId1);
        const primaryContact2: Contact = await findContactWithId(primaryContactId2);

        const [oldPrimaryContact, newPrimaryContact]: [Contact, Contact] =
          primaryContact1.createdAt < primaryContact2.createdAt
            ? [primaryContact1, primaryContact2]
            : [primaryContact2, primaryContact1];

        await updateLinkedId(newPrimaryContact.id, oldPrimaryContact.id);
        await createContact(email, phoneNumber, "secondary", oldPrimaryContact.id);

        primaryContactId = oldPrimaryContact.id;
      }
    }

    if (primaryContactId) {
      const contactsResponse = await getAllContactsByPrimaryId(primaryContactId);
      res.status(200).json(contactsResponse);
    } 
    else res.status(500).json({ message: "Error in handling the request." });
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server error");
  }
};

const getPrimaryContactIds = (contacts: Contact[]): number[] => {
  const primaryContactIds = new Set<number>();

  contacts.forEach((contact) => {
    if (contact.linkedId === null) {
      primaryContactIds.add(contact.id);
    } else {
      primaryContactIds.add(contact.linkedId);
    }
  });

  return [...primaryContactIds];
};
