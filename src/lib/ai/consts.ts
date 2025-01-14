export const friendsNameToImage: Record<string, string> = {
  "Rachel Green":
    "https://media.gettyimages.com/id/908311/photo/friends-television-stills.jpg?s=2048x2048&w=gi&k=20&c=emSWAyNjkrFd34rj8nWIPMptE1jAl_3ZMgJjcOm56sw=",
  "Monica Geller":
    "https://media.gettyimages.com/id/73906357/photo/courteney-cox-portrait.jpg?s=2048x2048&w=gi&k=20&c=4P-ep7Rfox46n9vr7JpQ0S8yC-5fPHH13xkrFJwHVJg=",
  "Ross Geller":
    "https://media.gettyimages.com/id/186114813/photo/friends-season-1.jpg?s=1024x1024&w=gi&k=20&c=sPiSKZu2UXwayeCgAuv_aarb0i1Hd-bYSBWUoWH-w-Y=",
  "Chandler Bing":
    "https://media.gettyimages.com/id/908303/photo/friends-television-stills.jpg?s=2048x2048&w=gi&k=20&c=DF8wR4yNIFpnHJTNfBFvm5qh965dzlOAea-r_OBiHFY=",
  "Joey Tribbiani":
    "https://media.gettyimages.com/id/143479335/photo/friends-season-1.jpg?s=2048x2048&w=gi&k=20&c=rDEBiZb1feM7FzRjYIYT0XxlqkDn17S8pN5wzRqfHZQ=",
  "Phoebe Buffay":
    "https://media.gettyimages.com/id/143479369/photo/lisa-kudrow-friends-portrait.jpg?s=2048x2048&w=gi&k=20&c=RNc93N_e1s86HIQe6S1-ZVUsF0KgB4-7k185QMkCFl8=",
};

// find it, without caring about case
export const getImageUrl = (name: string) => {
  const key = Object.keys(friendsNameToImage).find(
    (key) => key.toLowerCase() === name.toLowerCase()
  );
  return key ? friendsNameToImage[key] : null;
};

// List of the cast of Friends
export const friendsCast = [
  "Rachel Green",
  "Monica Geller",
  "Phoebe Buffay",
  "Joey Tribbiani",
  "Chandler Bing",
  "Ross Geller",
];

// Sample Friends-related content to generate posts
export const postTemplates = [
  "Remember the time Ross said, 'We were on a break!'? Classic!",
  "Could I BE any more excited about today?",
  "Smelly Cat, Smelly Cat, what are they feeding you?",
  "How you doin'?",
  "Pivot! Pivot! Pivot!",
  "Joey doesn’t share food!",
  "Monica’s apartment is the real MVP of the show.",
  "Rachel’s hairstyles throughout the seasons are iconic.",
  "Central Perk is my happy place.",
  "Could Monica and Chandler BE any cuter?",
  "I'm not a lesbian, I'm just attracted to women.",
  "We were on a break!", // Classic Ross line.
  "It's like all my life, everyone has always told me, ‘You’re a shoe!’",
  "Seven! Seven! Seven!", // Monica's hilarious enthusiasm.
  "I wish I could, but I don’t want to.", // Phoebe's blunt honesty.
  "If it’s a girl, Phoebe. If it’s a boy, Pheebo.", // Phoebe's baby name suggestion.
  "Oh. My. God!", // Janice’s iconic catchphrase.
  "I KNOW!", // Monica’s classic line.
  "He’s her lobster!", // Phoebe’s adorable metaphor.
  "That’s not even a word!", // Ross, frustrated at Scrabble.
  "This is brand-new information!", // Phoebe’s over-the-top fake surprise.
  "You can’t just give up! Is that what a dinosaur would do?", // Ross inspiring Joey.
  "I’m fine. Totally fine. I don’t know why it’s coming out all loud and squeaky!", // Ross pretending to be fine.
  "I’m Chandler. I make jokes when I’m uncomfortable.", // Chandler’s self-awareness.
  "Could I BE wearing any more clothes?", // Joey in Chandler's clothes.
  "No uterus, no opinion!", // Rachel shutting down Ross.
  "It’s a moo point. It’s like a cow’s opinion; it doesn’t matter.", // Joey’s philosophical take.
  "You’re over me? When were you… under me?", // Ross’s confusion.
  "Welcome to the real world. It sucks. You’re gonna love it.", // Monica to Rachel.
  "That is brand-new information!", // Phoebe doubling down on fake shock.
];
