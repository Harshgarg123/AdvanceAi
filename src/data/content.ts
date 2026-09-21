export const CONTENT = {
  subject: {
    name: 'Mansi',
    birthday: '22 September',
    date: '22.09',
    aliases: ['Beboo', 'Baboo', 'Laddooo', 'Chota Bacha'],
  },

  opening: {
    intro: 'PRIVATE PROJECT',
    date: '22.09',
    access: 'ACCESS RESTRICTED',
    authorized: 'Authorized subject detected.',
    alsoKnownAs: 'Also known as…',
    seriously: 'Seriously?',
    fourNames: 'Four names?',
    investigation: 'Okay. This investigation is going to take a while.',
    enterButton: 'ENTER →',
  },

  profile: {
    title: 'SUBJECT PROFILE',
    stats: [
      { label: 'Cute', value: 100, display: '100%' },
      { label: 'Attitude', value: 82, display: '82%' },
      { label: '"Chuppp" probability', value: 99, display: '99%' },
      { label: '"Maar dungi" threat level', value: 73, display: '73%' },
      { label: 'Tolerance for nonsense', value: 19, display: '19%' },
      { label: 'Main character energy', value: 100, display: '100%' },
    ],
    assessment: 'Assessment complete.',
    afterAssessment: 'Subject is definitely going to say "you need help" after seeing this.',
    personality: 'Classified.',
  },

  nameGenerator: {
    title: 'WHAT SHOULD WE CALL HER TODAY?',
    buttonText: 'Generate name',
    names: [
      { name: 'Beboo', note: null },
      { name: 'Baboo', note: null },
      { name: 'Laddooo', note: 'Highly classified nickname.' },
      { name: 'Chota Bacha', note: "Don't tell her I said that." },
      { name: 'Madam', note: null },
      { name: 'Drama Queen', note: null },
      { name: 'Okay fine, Mansi.', note: null },
    ],
  },

  investigation: {
    heading: 'WE HAVE A PROBLEM.',
    text1: 'We tried to build a normal birthday website.',
    text2: 'It became a Mansi investigation.',
    cards: [
      {
        id: 'smile',
        title: 'THE SMILE',
        status: 'Under investigation.',
        effect: 'Causes unexplained happiness in nearby individuals.',
        icon: 'smile',
      },
      {
        id: 'attitude',
        title: 'THE ATTITUDE',
        status: 'Considerable.',
        effect: 'Deployed with precision. No survivors reported.',
        icon: 'zap',
      },
      {
        id: 'moments',
        title: 'THE RANDOM MOMENTS',
        status: 'Frequent and unpredictable.',
        effect: 'Subject generates chaos at a rate that defies logic.',
        icon: 'sparkles',
      },
      {
        id: 'chuppp',
        title: 'THE "CHUPPP"',
        status: 'Frequently deployed.',
        effect: 'Conversation temporarily terminated.',
        icon: 'volume-x',
      },
      {
        id: 'maardungi',
        title: 'THE "MAAR DUNGI"',
        status: 'Threat detected.',
        effect: 'Actual danger: probably 0.7%.',
        icon: 'alert-triangle',
      },
      {
        id: 'chotabacha',
        title: 'THE CHOTA BACHA',
        status: 'Undeniable.',
        effect: 'Despite all protests, evidence confirms small child energy.',
        icon: 'baby',
      },
      {
        id: 'youneedhelp',
        title: 'THE "YOU NEED HELP"',
        status: 'Valid criticism.',
        effect: 'Creator response: Fair.',
        icon: 'help-circle',
      },
    ],
  },

  evidence: {
    heading: 'EVIDENCE',
    subtitle:
      'We regret to inform you that there is substantial evidence that Mansi is adorable.',
    photos: [
      {
        id: '001',
        subject: 'Beboo',
        status: 'Too cute. Suspicious.',
        query: 'portrait woman smiling soft light',
      },
      {
        id: '002',
        subject: 'Laddooo',
        status: 'Exhibit A.',
        query: 'woman candid laughing golden hour',
      },
      {
        id: '003',
        subject: 'Chota Bacha',
        status: 'Do not disturb.',
        query: 'young woman thoughtful portrait moody',
      },
      {
        id: '004',
        subject: 'Mansi',
        status: 'Okay, this one is actually unfair.',
        query: 'woman elegant portrait cinematic warm',
      },
    ],
  },

  simulator: {
    title: "LET'S TEST SOMETHING.",
    text: 'After seeing this website, what are the chances Mansi says…',
    quotes: [
      { text: 'You need help.', probability: 87 },
      { text: 'Chuppp.', probability: 94 },
      { text: "I'm done with this guy.", probability: 76 },
      { text: 'Maar dungi.', probability: 63 },
    ],
    confidence: 'Prediction confidence: dangerously high.',
    button: 'Test prediction',
    result1: 'Prediction successful.',
    result2: "See? We know you too well.",
  },

  chatLog: {
    messages: [
      { from: 'unknown', text: 'Beboo.' },
      { from: 'mansi', text: 'Chuppp.' },
      { from: 'unknown', text: 'Baboo.' },
      { from: 'mansi', text: 'You need help.' },
      { from: 'unknown', text: 'Laddooo.' },
      { from: 'mansi', text: "I'm done with this guy." },
      { from: 'unknown', text: 'Chota bacha.' },
      { from: 'mansi', text: 'MAAR DUNGI.' },
    ],
    analysis: 'Conversation analysis complete.',
    conclusion: 'Conclusion:',
    result1: 'She pretends to be annoyed.',
    result2: 'She is probably secretly amused.',
  },

  algorithm: {
    title: 'MANSI ANALYSIS ENGINE',
    metrics: [
      { label: 'Smile', value: 100 },
      { label: 'Cuteness', value: 100 },
      { label: 'Attitude', value: 82 },
      { label: 'Chuppp frequency', value: 97 },
      { label: 'Randomness', value: 91 },
      { label: 'Chota Bacha energy', value: 100 },
      { label: 'Ability to make someone smile', value: -1, error: true } as { label: string; value: number; error?: boolean },
    ],
    errorText: 'ERROR: VALUE EXCEEDS SYSTEM LIMIT.',
    result: 'MANSI.',
  },

  question: {
    intro: 'Okay, Beboo.',
    serious: 'Serious question.',
    question: 'Are you enjoying this?',
    optionYes: 'Obviously.',
    optionChuppp: 'Chuppp.',
    yesResponse1: 'Good.',
    yesResponse2: 'I spent way too much time on this.',
    chupppResponse1: 'Okay.',
    chupppResponse2: 'Still counting that as a yes.',
    continue: 'Continue →',
  },

  realReason: {
    enough: 'Enough investigation.',
    actualReason: 'The actual reason this exists…',
    birthday: "It's your birthday.",
    date: '22.09',
    happyBirthday: 'Happy Birthday, Mansi.',
  },

  memoryTimeline: {
    heading: 'LITTLE MOMENTS.',
    subtitle: 'The ones that somehow stayed.',
    editNote: 'This part is just a starting point — tap the pencil to write in the real memory.',
    localOnlyNote: "Changes are local only. They won't be saved if you refresh.",
    tapHint: 'Tap to open',
    moments: [
      {
        id: 'm1',
        title: 'First conversation',
        description:
          "The one that started it all. I don't remember every word, but I remember not wanting it to end.",
      },
      {
        id: 'm2',
        title: 'That one random conversation',
        description:
          'You said something unexpectedly funny, and I caught myself smiling about it hours later.',
      },
      {
        id: 'm3',
        title: 'A moment that made me smile',
        description:
          'Nothing dramatic. Just an ordinary moment that somehow stuck. Those are the best kind.',
      },
      {
        id: 'm4',
        title: 'An inside joke',
        description: "The kind only we'd understand. I won't write it here — you know the one.",
      },
      {
        id: 'm5',
        title: 'A moment I secretly wished could last longer',
        description:
          "Time didn't exactly slow down, but for a second, it felt like it could have.",
      },
    ],
  },

  thingsILike: {
    heading: 'THINGS I LIKE ABOUT YOU.',
    items: [
      { id: 't1', text: 'Your smile.', subtitle: 'It changes the temperature of a room.' },
      { id: 't2', text: 'Your energy.', subtitle: 'The kind that makes people lean in.' },
      {
        id: 't3',
        text: 'The way you make conversations interesting.',
        subtitle: "Not everyone can do that, you know.",
      },
      {
        id: 't4',
        text: "The little things you probably don't even notice.",
        subtitle: 'But someone does.',
      },
      { id: 't5', text: 'Your laugh.', subtitle: 'Genuine. Contagious. Memorable.' },
      {
        id: 't6',
        text: 'Your ability to make a normal day feel better.',
        subtitle: 'Without even trying.',
      },
      {
        id: 't7',
        text: 'And honestly…',
        isSpecial: true,
        revealText: "There are probably more than I can fit on this website.",
      },
    ],
  },

  ifYouWere: {
    heading: 'IF YOU WERE A…',
    subtitle: 'Just a little thought experiment.',
    cards: [
      {
        id: 'song',
        prompt: 'If you were a song',
        answer: "You'd be the one I accidentally keep replaying.",
        icon: 'music',
      },
      {
        id: 'place',
        prompt: 'If you were a place',
        answer: "Somewhere I'd never get tired of visiting.",
        icon: 'map-pin',
      },
      {
        id: 'season',
        prompt: 'If you were a season',
        answer: 'Probably the one that makes everything feel a little warmer.',
        icon: 'sun',
      },
      {
        id: 'color',
        prompt: 'If you were a color',
        answer: 'Something somewhere between sunset and rose.',
        icon: 'palette',
      },
      {
        id: 'feeling',
        prompt: 'If you were a feeling',
        answer: 'The kind that makes you smile without realizing it.',
        icon: 'heart',
      },
    ],
  },

  message: {
    title: 'Okay, one serious thing.',
    body: `Mansi,

I could have just wished you Happy Birthday.

But where's the fun in that?

So instead, I made an unnecessarily complicated website,
because apparently that's what happens when I get an idea.

You've somehow collected quite a few names along the way —
Beboo, Baboo, Laddooo, Chota Bacha…

and somehow all of them suit you.

You may tell me:
'You need help.'

You may say:
'Chuppp.'

You may even say:
'I'm done with this guy.'

And honestly, that's probably fair.

But I still wanted to make something that would make you smile today.

I hope this year brings you a lot of happiness,
good people,
good memories,
and plenty of reasons to laugh.

Happy Birthday, Mansi.

Now please don't say 'maar dungi' after seeing how much effort went into this.`,
    signature: '— the guy who definitely needs help',
  },

  constellation: {
    heading: "THINGS THAT DIDN'T FIT IN THE REPORT.",
    subtitle:
      "The investigation covered the evidence. It missed a few things that don't fit in a table. So they're up here instead.",
    instruction: 'Tap a star to reveal it.',
    progressPrefix: 'MAPPED',
    stars: [
      {
        id: 'star-smile',
        title: 'BEBOO',
        note: 'Somehow even a two-second smile from you fixes an entire bad day. No investigation needed for that one — it\u2019s just true.',
      },
      {
        id: 'star-chaos',
        title: 'LADDOOO',
        note: 'You have a genuine talent for turning an ordinary Tuesday into an event. Scientists remain baffled. So do I.',
      },
      {
        id: 'star-attitude',
        title: 'DRAMA QUEEN',
        note: 'The attitude is 82% documented in the profile. The other 18% is exactly what makes you fun to argue with.',
      },
      {
        id: 'star-loyalty',
        title: 'CHOTA BACHA',
        note: 'Small child energy, confirmed. But also the first person who shows up when it actually matters. Contradiction noted and appreciated.',
      },
      {
        id: 'star-chuppp',
        title: 'CHUPPP',
        note: 'You say it to end every conversation you\u2019re secretly enjoying. This has been independently verified multiple times.',
      },
      {
        id: 'star-threat',
        title: 'MAAR DUNGI',
        note: 'Threat level: high volume, low follow-through. Delivery remains a solid 10 out of 10.',
      },
      {
        id: 'star-realone',
        title: 'MANSI',
        note: 'Take away every nickname, every joke, every \u201cyou need help\u201d \u2014 and it\u2019s still just this: someone worth building an unnecessarily complicated website for.',
      },
    ],
    allFoundHeading: 'ALL STARS MAPPED.',
    allFoundText: 'One more thing was hiding behind the last one.',
    countdown: {
      label: 'NEXT ROTATION AROUND THE SUN',
      unitDays: 'Days',
      unitHours: 'Hours',
      unitMinutes: 'Minutes',
      unitSeconds: 'Seconds',
      todayLabel: "It's today.",
      todayText: 'Happy Birthday, Mansi. Go celebrate \u2014 this website will still be here when you\u2019re done.',
    },
  },

  secret: {
    buttonLabel: "Don't click this.",
    buttonHint: "(but you will, won't you?)",
    messages: [
      'Okay… you clicked it.',
      'I knew you would.',
      "Since you're already here…",
      'There is something quietly wonderful about someone who is told "don\u2019t click this" and immediately clicks it. That\u2019s you, though. You\u2019ve never been good at leaving things unexplored. And honestly? That\u2019s one of the things I like most about you \u2014 this quiet curiosity, this way you have of leaning into life instead of away from it. So here\u2019s a secret: this button was never really a "don\u2019t." It was a "I hope you do." And you did.',
    ],
  },

  finalTrap: {
    wait: 'WAIT.',
    finalThing: 'One final thing.',
    button: "Probably don't click this.",
    detections: ['Beboo detected.', 'Baboo detected.', 'Laddooo detected.', 'Chota Bacha detected.'],
    enough: 'Okay, enough.',
    happyBirthday: 'Happy Birthday, Mansi.',
    wish: {
      heading: 'One more tradition.',
      instruction: 'Blow out the candle.',
      instructionHint: '(Tap the flame.)',
      blownLabel: 'Make a wish.',
      placeholder: 'Type it here. No one else will see it.',
      sealButton: 'Seal the wish',
      sealedHeading: 'Sealed.',
      sealedText: "Whatever it was, I hope it finds you. Wishes don't need explanations.",
    },
  },

  finalScene: {
    date: '22.09',
    name: 'MANSI',
    nextChapter: 'YOUR NEXT CHAPTER STARTS HERE.',
    makeItBeautiful: 'Make it a beautiful one.',
    closing: 'Happy Birthday, Beboo.',
    footer: 'Made with questionable amounts of effort.',
  },

  reactions: {
    systemPrompt: 'Was that too much?',
    options: ['Chuppp.', 'You need help.', "I'm done with this guy."],
    chupppResponse: ["Okay okay. I'm quiet.", '…for approximately 4 seconds.'] as string[],
    helpResponse: ['Correct.', 'Unfortunately, there is no known cure.'] as string[],
    doneResponse: ['Understandable.', "Please don't leave yet."] as string[],
  },

  easterEggs: {
    bebooClicks: {
      3: 'Nickname confirmed.',
    },
    chupppSpam: 'Okay okay okay!!!',
    youNeedHelp: 'Finally, someone understands.',
    maarDungi: ['Threat recorded.', 'Birthday girl has been temporarily muted.'],
  },
} as const;

export type Content = typeof CONTENT;
