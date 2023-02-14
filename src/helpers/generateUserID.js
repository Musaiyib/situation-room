import { v4 as uuidv4 } from 'uuid';

export default function generateUserId({ role, zone }) {
  const id = uuidv4().substring(0, 4);
  const shortZone = zone.slice(0, 3);

  return `${role}-${id}-${shortZone}`;
}
