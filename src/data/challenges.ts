export interface EmailChallenge {
  id: string;
  type: 'email';
  difficulty: 'easy' | 'medium' | 'hard';
  isScam: boolean;
  from: string;
  subject: string;
  preview: string;
  redFlags?: string[];
  explanation: string;
  xpReward: number;
}

export const challenges: EmailChallenge[] = [
  {
    id: '1',
    type: 'email',
    difficulty: 'easy',
    isScam: true,
    from: 'security@amaz0n-verify.com',
    subject: '⚠️ URGENT: Your account will be suspended in 24 hours',
    preview: 'Dear Valued Customer, We have detected unusual activity on your account. Click here immediately to verify your identity or your account will be permanently suspended...',
    redFlags: ['Fake domain (amaz0n)', 'Urgency tactics', 'Generic greeting'],
    explanation: 'This is a phishing email. Notice the fake domain "amaz0n-verify.com" instead of amazon.com, the urgent language designed to make you panic, and the generic "Dear Valued Customer" greeting.',
    xpReward: 10,
  },
  {
    id: '2',
    type: 'email',
    difficulty: 'easy',
    isScam: false,
    from: 'noreply@github.com',
    subject: 'A new device signed in to your account',
    preview: 'Hi sarah_dev, A new device just signed in to your GitHub account. If this was you, you can ignore this email. Device: Chrome on Windows...',
    explanation: 'This is a legitimate security notification from GitHub. It uses your actual username, comes from the official github.com domain, and doesn\'t ask you to click any urgent links.',
    xpReward: 10,
  },
  {
    id: '3',
    type: 'email',
    difficulty: 'medium',
    isScam: true,
    from: 'support@paypa1.com',
    subject: 'Payment received: $892.50',
    preview: 'You received a payment of $892.50 from John Miller. The funds are pending verification. Log in to your account to confirm and release the payment...',
    redFlags: ['Domain uses "1" instead of "l"', 'Unexpected payment', 'Pressure to act'],
    explanation: 'This is a sophisticated phishing attempt. The domain "paypa1.com" uses the number 1 instead of the letter L. Real PayPal emails come from paypal.com.',
    xpReward: 15,
  },
  {
    id: '4',
    type: 'email',
    difficulty: 'medium',
    isScam: false,
    from: 'receipts@uber.com',
    subject: 'Your trip with Uber',
    preview: 'Thanks for riding with Uber! Trip to 123 Main Street. Total: $24.50. Driver: Marcus ⭐ 4.92. Rate your trip and get $5 off your next ride...',
    explanation: 'This is a legitimate Uber receipt. It contains specific trip details, comes from the official uber.com domain, and matches the format of real Uber emails.',
    xpReward: 15,
  },
  {
    id: '5',
    type: 'email',
    difficulty: 'hard',
    isScam: true,
    from: 'ceo@company-internal.com',
    subject: 'Quick favor needed - confidential',
    preview: 'Hey, I\'m in a meeting and need you to purchase some gift cards for a client appreciation event. Get 5x $200 Amazon cards and send me the codes. Will reimburse later. Don\'t tell anyone, it\'s a surprise.',
    redFlags: ['Gift card request', 'Secrecy', 'Unusual request from CEO', 'Urgency'],
    explanation: 'This is a classic CEO fraud/business email compromise. Real executives never ask employees to secretly buy gift cards. Always verify unusual requests through a different channel.',
    xpReward: 25,
  },
  {
    id: '6',
    type: 'email',
    difficulty: 'hard',
    isScam: false,
    from: 'security-noreply@google.com',
    subject: 'Security alert: New sign-in from iPhone',
    preview: 'Your Google Account was just signed in to from a new iPhone. Sarah Miller, sarahm@gmail.com. iPhone 15 Pro, San Francisco, CA. If this was you, you can ignore this message...',
    explanation: 'This is a legitimate Google security alert. It comes from the official Google domain, includes specific details about the sign-in, and doesn\'t pressure you to click anything urgently.',
    xpReward: 25,
  },
  {
    id: '7',
    type: 'email',
    difficulty: 'easy',
    isScam: true,
    from: 'winner@lottery-international.org',
    subject: '🎉 Congratulations! You won $5,000,000!',
    preview: 'You have been selected as the winner of our international lottery! To claim your prize of $5,000,000 USD, please send a processing fee of $500 via Western Union...',
    redFlags: ['Lottery you never entered', 'Upfront fee required', 'Too good to be true'],
    explanation: 'Classic lottery scam. You can\'t win a lottery you never entered. Legitimate lotteries never ask for fees to claim prizes.',
    xpReward: 10,
  },
  {
    id: '8',
    type: 'email',
    difficulty: 'medium',
    isScam: true,
    from: 'delivery@fedex-tracking.net',
    subject: 'Delivery failed - Package waiting',
    preview: 'We attempted to deliver your package but nobody was available. Your package is being held at our facility. Pay the $2.99 redelivery fee to schedule a new delivery date...',
    redFlags: ['Fake domain', 'Small fee request', 'Vague package details'],
    explanation: 'Shipping scam using a fake domain. FedEx uses fedex.com, not fedex-tracking.net. The small fee is designed to steal your payment information.',
    xpReward: 15,
  },
];

export const getRandomChallenge = (excludeIds: string[] = []): EmailChallenge => {
  const available = challenges.filter(c => !excludeIds.includes(c.id));
  if (available.length === 0) {
    return challenges[Math.floor(Math.random() * challenges.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-success';
    case 'medium': return 'text-streak';
    case 'hard': return 'text-destructive';
    default: return 'text-muted-foreground';
  }
};
