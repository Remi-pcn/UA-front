import type { Meta, StoryObj } from '@storybook/react';
import TeamMember from './TeamMember';

const meta = {
  title: 'Landing/TeamMember',
  component: TeamMember,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamMember>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    member: { id: 'ABCDEF', name: 'Jean Dupont', username: 'superjean' },
    commission: { id: 'dev', name: 'Développement', color: '#FF0000' },
    role: 'member',
  },
};

export const WithGivenImage: Story = {
  args: {
    member: { id: 'ABCDEF', name: 'Jean Dupont', username: 'superjean' },
    commission: { id: 'dev', name: 'Développement', color: '#FF0000' },
    role: 'member',
    image: 'https://picsum.photos/200',
  },
};

export const WithPresident: Story = {
  args: {
    member: { id: 'ABCDEF', name: 'Jean Dupont', username: 'superjean' },
    commission: { id: 'coord', name: 'Coordinateur', color: '#0000FF' },
    role: 'member',
  },
};
