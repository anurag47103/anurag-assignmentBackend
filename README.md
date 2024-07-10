# Identity Reconciliation API

This API identifies and reconciles user contacts based on email and phone number.

## API Endpoint

- **URL:** `https://anurag-assignmentbackend.onrender.com/api/identify`
- **Method:** `POST`

## Request Body

```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```

## Request Body

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["user@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

## Explanation

### Contact Grouping:

	•	Each user has one primary contact entry.
	•	All other contact entries for the same user are marked as secondary contacts.
	•	The linkedId of each secondary contact points to the primary contact’s ID.

### Merging Contact Sets:

When merging two sets of contacts:

	1.	Identify the primary contacts for both sets.
	2.	Convert the primary contact of the second set into a secondary contact.
	3.	Update its linkedId to point to the primary contact of the first set.
	4.	Ensure all secondary contacts that were linked to the second set’s primary contact are now linked to the first set’s primary contact.

## Link to Resume
https://drive.google.com/file/d/1gqFyz5MyW1okzY0Xzb81vJfovMOJJZij/view?usp=sharing