'use client';

const TimeIcons = {
    Morning: ["🌅", "☕", "🌄"],
    Afternoon: ["🌞", "😎", "🌻"],
    Evening: ["🌜", "🌆", "✨"],
    Night: ["🌙", "🌉", "🌑"],
};

export default function WelcomeIcon() {

    const time = new Date().getHours();

    let timeOfDay = "Morning";
    if (time >= 12 && time < 17) {
        timeOfDay = "Afternoon";
    }
    else if (time >= 17 && time < 21) {
        timeOfDay = "Evening";
    } else if (time >= 21 || time < 5) {
        timeOfDay = "Night";
    }

    const icons = TimeIcons[timeOfDay];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    return (
        <div className="text-2xl">
            {randomIcon}
        </div>
    );


}