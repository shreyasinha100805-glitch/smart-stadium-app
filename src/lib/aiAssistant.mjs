const assistantKnowledge = [
  {
    keywords: ["parking", "lot", "park", "vehicle"],
    reply: "🅿️ Parking available at Lot A (24 spots), Lot B (18 spots), and Lot C (disabled access). All are a short walk from gates. Lot A is closest to Gate B4. Book ahead via the app."
  },
  {
    keywords: ["food", "snack", "concession", "meal", "eat"],
    reply: "🍕 South Concourse has fastest service (8 min avg). Vegan/halal options at East Wing. Order ahead for delivery to your seat. Dietary restrictions? Ask for allergen menu."
  },
  {
    keywords: ["ticket", "entry", "gate", "qr", "admission"],
    reply: "🎫 Mobile tickets available at all gates. Bring QR code or printed ticket. Early entry (2hr before kickoff) at Gate B4. ADA guests use accessible entrance at Gate A1."
  },
  {
    keywords: ["weather", "rain", "umbrella", "cold", "storm"],
    reply: "☔ Light rain expected 2nd half. Ponchos available at merchandise stands. Bring layers—stadium gets windy. Real-time weather updates on home screen."
  },
  {
    keywords: ["queue", "wait", "line", "crowd"],
    reply: "⏱️ Coffee Corner: 3 min | Beer Garden: 12 min | Pizza: 8 min. Halftime sees peaks at all vendors. Crowd density: 78% full. West entrance less crowded right now."
  },
  {
    keywords: ["accessible", "disability", "wheelchair", "asl", "service dog"],
    reply: "♿ Accessible parking at Lot A. Wheelchair seating in every section. Live ASL interpretation available. Service animals welcome. Quiet room in Club Level. Contact accessibility office: ext. 2500."
  },
  {
    keywords: ["transportation", "transit", "public", "bus", "metro", "ride"],
    reply: "🚌 Public transit: Bus line 42 stops at stadium. Metro station 0.5km away. Ride-share pickup at North Lot. Park & Ride available 5km out. Shuttle service for large groups."
  },
  {
    keywords: ["sustainability", "eco", "green", "carbon", "environment"],
    reply: "🌱 Eco-friendly options: Reusable cups (10% discount), digital tickets save paper, public transit info available. Your visit: ~2.5kg CO2. Carbon offset via tree planting program."
  },
  {
    keywords: ["map", "navigation", "direction", "restroom", "bathroom"],
    reply: "🗺️ View interactive stadium map for restrooms, exits, first aid, nursing rooms, prayer rooms, and accessibility features. Turn-by-turn directions available."
  },
  {
    keywords: ["crowd", "busy", "peak", "capacity"],
    reply: "📊 Real-time crowd analytics: 78% full | Exits flowing smoothly | Concourse congestion: North (high), South (low), East (medium). Suggested: Exit via East gate in 15 min."
  },
  {
    keywords: ["emergency", "medical", "help", "first aid"],
    reply: "🆘 First aid stations in every section. Security at all gates. Call ext. 911 from stadium phones. Medical tent near Gate C2. Report emergencies immediately to nearest staff."
  },
  {
    keywords: ["language", "spanish", "french", "arabic", "translate"],
    reply: "🌐 Available languages: Spanish, French, Mandarin, Arabic, Japanese. Select in settings. Live translation on screens. Multilingual staff at info desks."
  },
  {
    keywords: ["match", "score", "live", "update", "replay"],
    reply: "🏆 Live score: Tigers 1-0 Falcons (Q2, 08:32 remaining). Replays available on big screen. Key moments every 30 sec. Team stats updated real-time."
  },
  {
    keywords: ["vip", "premium", "club", "lounge"],
    reply: "👑 VIP access to Club Level lounge with premium food, dedicated seating, and premium parking. Upgrade available at stadium ticket office."
  },
  {
    keywords: ["group", "organize", "volunteer", "staff"],
    reply: "👥 Group bookings, volunteer opportunities, and staff resources available. Contact operations team: ops@stadium.com | Phone: +1-555-STADIUM"
  }
];

export function generateAssistantReply(question) {
  const normalized = (question || "").toLowerCase();

  const match = assistantKnowledge.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword))
  );

  if (match) {
    return match.reply;
  }

  return "I can help with parking, food, tickets, navigation, accessibility, sustainability, crowd info, transportation, and more. What do you need?";
}
