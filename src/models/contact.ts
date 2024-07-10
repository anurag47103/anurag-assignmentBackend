import pool from '../../db';
import { Contact } from './contactInterface';

export const findAllContactsMatchingEmailOrPhone = async (
  email: string | null,
  phoneNumber: string | null
): Promise<Contact[]> => {
  const client = await pool.connect();

  try {
    const conditions = [];
    const queryParams = [];

    if (email) {
      conditions.push(`"email" = $${queryParams.length + 1}`);
      queryParams.push(email);
    }
    if (phoneNumber) {
      conditions.push(`"phoneNumber" = $${queryParams.length + 1}`);
      queryParams.push(phoneNumber);
    }
    if (conditions.length === 0) {
      return [];
    }

    const query = `SELECT * FROM Contact WHERE ${conditions.join(' OR ')}`;
    const result = await client.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  } finally {
    client.release();
  }
};
export const checkIfAlreadyExists = async (
  email: string | null,
  phoneNumber: string | null
): Promise<Contact | null> => {
  const client = await pool.connect();

  try {
    let query = 'SELECT * FROM Contact WHERE';
    const queryParams: (string | null)[] = [];
    const conditions: string[] = [];

    if (email !== null) {
      conditions.push(`"email" = $${queryParams.length + 1}`);
      queryParams.push(email);
    } 
    else {
      conditions.push('"email" IS NULL');
    }

    if (phoneNumber !== null) {
      conditions.push(`"phoneNumber" = $${queryParams.length + 1}`);
      queryParams.push(phoneNumber);
    } 
    else {
      conditions.push('"phoneNumber" IS NULL');
    }

    query += ' ' + conditions.join(' AND ');

    const result = await client.query(query, queryParams);
    return result.rowCount === 0 ? null : result.rows[0];
  } catch (error) {
    console.error('Error checking if contact already exists:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getAllContactsByPrimaryId = async (id: number) => {
  const client = await pool.connect();

  try {
    const query = `
      SELECT * 
      FROM Contact 
      WHERE "id" = $1 OR "linkedId" = $1
    `;
    const result = await client.query(query, [id]);
    const contacts = result.rows;

    if (contacts.length === 0) {
      throw new Error(`No contacts found for primary ID: ${id}`);
    }

    const primaryContact = contacts.find((contact) => contact.id === id);
    const secondaryContacts = contacts.filter((contact) => contact.linkedId === id);

    return {
      contact: {
        primaryContactId: primaryContact.id,
        emails: Array.from(
          new Set([primaryContact.email, ...secondaryContacts.map((contact) => contact.email)].filter(Boolean))
        ),
        phoneNumbers: Array.from(
          new Set([primaryContact.phoneNumber, ...secondaryContacts.map((contact) => contact.phoneNumber)].filter(Boolean))
        ),
        secondaryContactIds: Array.from(new Set(secondaryContacts.map((contact) => contact.id))),
      },
    };
  } catch (error) {
    console.error('Error fetching contacts by primary ID:', error);
    throw error;
  } finally {
    client.release();
  }
};


export const updateLinkedId = async (toUpdateContactId: number, newLinkedId: number) => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE Contact
      SET "linkedId" = $2, "linkPrecedence" = 'secondary'
      WHERE "id" = $1 OR "linkedId" = $1
    `;

    const result = await client.query(query, [toUpdateContactId, newLinkedId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const findContactWithId = async (id: number): Promise<Contact> => {
  const client = await pool.connect();

  try {
    const query = `
      SELECT * 
      FROM Contact
      WHERE "id" = $1
    `;

    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting contact:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const createContact = async (
  email: string | null,
  phoneNumber: string | null,
  linkPrecedence: 'primary' | 'secondary',
  linkedId: number | null
) => {
  const client = await pool.connect();

  try {
    const query = `
      INSERT INTO Contact (email, "phoneNumber", "linkedId", "linkPrecedence", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING *;
    `;
    const result = await client.query(query, [email, phoneNumber, linkedId, linkPrecedence]);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting contact:', error);
    throw error;
  } finally {
    client.release();
  }
};
