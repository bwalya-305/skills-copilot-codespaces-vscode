function skillsMember() {
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("memberSkills");
    var memberSkillsButton = document.getElementById("memberSkillsButton");
    var memberSkillsButtonIcon = document.getElementById("memberSkillsButtonIcon");
    if (memberSkills.style.display === "none") {
        memberSkills.style.display = "block";
        memberSkillsButton.style.backgroundColor = "#f5f5f5";
        memberSkillsButton.style.color = "#000";
        memberSkillsButtonIcon.style.transform = "rotate(180deg)";
        member.style.borderBottom = "none";
    } else {
        memberSkills.style.display = "none";
        memberSkillsButton.style.backgroundColor = "#fff";
        memberSkillsButton.style.color = "#000";
        memberSkillsButtonIcon.style.transform = "rotate(0deg)";
        member.style.borderBottom = "1px solid #ddd";
    }
}