import { BOOKLEAF_KB } from "./bookleafKB";

export const buildTicketPrompt = (
  subject: string,
  description: string
) => {

  const lowerCaseText = `${subject} ${description}`.toLowerCase();

  let relevantContext = BOOKLEAF_KB.general;

  if (
    lowerCaseText.includes("royalty") ||
    lowerCaseText.includes("payment")
  ) {
    relevantContext = BOOKLEAF_KB.royalty;
  }

  if (
    lowerCaseText.includes("isbn") ||
    lowerCaseText.includes("metadata")
  ) {
    relevantContext = BOOKLEAF_KB.isbn;
  }

  if (
    lowerCaseText.includes("print") ||
    lowerCaseText.includes("quality")
  ) {
    relevantContext = BOOKLEAF_KB.printing;
  }

  if (
    lowerCaseText.includes("amazon") ||
    lowerCaseText.includes("distribution")
  ) {
    relevantContext = BOOKLEAF_KB.distribution;
  }

  return `
You are an AI support assistant for BookLeaf Publishing.

Knowledge Base:
${relevantContext}

Author Ticket:
Subject: ${subject}

Description:
${description}

Your tasks:
1. Classify the ticket category
2. Assign priority
3. Generate professional support response

Possible Categories:
- Royalty & Payments
- ISBN & Metadata Issues
- Printing & Quality
- Distribution & Availability
- Book Status & Production Updates
- General Inquiry

Possible Priorities:
- Critical
- High
- Medium
- Low

Return ONLY valid JSON.

Example:
{
  "category": "Royalty & Payments",
  "priority": "High",
  "draftResponse": "Professional response here"
}
`;
};