import { ProfileItem } from 'src/auth/types/user.types';

export const defaultProfileInfo: ProfileItem[] = [
  {
    key: 'name',
    value: '---',
  },
  {
    key: 'phone',
    value: '---',
  },
  {
    key: 'address',
    value: '---',
  },
  {
    key: 'about',
    value: '---',
  },
];

export const defaultProfileInfoJSON: string[] = defaultProfileInfo.map((el) =>
  JSON.stringify(el),
);
