const questions = [
    {
        text: "연인과 갈등이 생겼을 때, 당신의 반응은?",
        choices: [
            { text: "문제가 완전히 해결될 때까지 대화로 풀어나가려고 한다.", type: "C" }, // Communication - Direct
            { text: "감정이 격해질 수 있으니, 잠시 시간을 가지고 생각한 후 대화한다.", type: "A" }  // Communication - Avoidant
        ]
    },
    {
        text: "이상적인 연애 관계는 어떤 모습이라고 생각하나요?",
        choices: [
            { text: "서로에게 헌신하며 미래를 함께 계획하는 안정적인 관계.", type: "S" }, // Security - Stability
            { text: "각자의 독립적인 공간을 존중하며 자유롭게 교류하는 관계.", type: "I" }   // Security - Independence
        ]
    },
    {
        text: "연인에게 애정을 표현하는 방식은?",
        choices: [
            { text: "손 잡기, 포옹 등 스킨십이나 공개적인 애정 표현에 익숙하다.", type: "P" }, // Affection - Physical/Public
            { text: "말로 표현하거나 사적인 공간에서 조용히 마음을 전한다.", type: "R" }    // Affection - Reserved/Private
        ]
    },
    {
        text: "연인과 함께 성장하는 방식 중 더 중요하게 생각하는 것은?",
        choices: [
            { text: "서로의 취미를 공유하고 함께 배우며 발전하는 것.", type: "G" }, // Growth - Shared hobbies/Personal Growth
            { text: "경제적 안정이나 사회적 지위를 함께 높여나가는 것.", type: "M" }  // Growth - Material/Status
        ]
    },
    {
        text: "연인이 주말에 친구들과 시간을 보내고 싶어 한다면?",
        choices: [
            { text: "즐거운 시간을 보내라고 응원하며 나만의 시간을 보낸다.", type: "I" },
            { text: "함께 시간을 보내는 것이 좋지만, 상대의 의견을 존중한다.", type: "S" }
        ]
    },
    {
        text: "중요한 결정을 앞두고 연인과 의견 차이가 있다면?",
        choices: [
            { text: "서로의 논리를 설득하며 최선의 방법을 찾으려 한다.", type: "C" },
            { text: "상대의 감정을 존중하고 갈등을 피하기 위해 양보할 수 있다.", type: "A" }
        ]
    },
    {
        text: "연인에게 가장 듣고 싶은 말은?",
        choices: [
            { text: "사랑해, 네가 최고야 같은 직접적인 애정 표현.", type: "P" },
            { text: "네 덕분에 행복해, 네 존재 자체가 소중해 같은 진심 어린 말.", type: "R" }
        ]
    },
    {
        text: "연애를 통해 가장 얻고 싶은 것은?",
        choices: [
            { text: "함께 새로운 경험을 하고 개인적으로 성장하는 기회.", type: "G" },
            { text: "든든한 동반자가 되어 안정적인 삶을 꾸려나가는 것.", type: "S" }
        ]
    },
    {
        text: "연인에게 바라는 솔직함의 정도는?",
        choices: [
            { text: "모든 것을 솔직하게 공유하며 감추는 것 없이 투명하게 지내는 것.", type: "C" },
            { text: "때로는 서로의 사생활을 존중하며 말하지 않아도 되는 부분은 있다.", type: "A" }
        ]
    },
    {
        text: "당신의 연애에서 가장 중요한 가치는?",
        choices: [
            { text: "서로의 성장과 발전을 돕는 동반자적 관계.", type: "G" },
            { text: "변치 않는 사랑과 헌신으로 이루어진 안정적인 관계.", type: "S" }
        ]
    }
];
