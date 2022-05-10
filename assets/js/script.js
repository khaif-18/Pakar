const button = document.getElementById("kirim");
button.addEventListener("click", recommendation_support);

let cf_member_status;
let cf_reason;
let cf_problem;
let cf_support;

const temp = {
  member_status: "",
  reason: "",
  problem: "",
};

const cf = {
  cf_member: "",
  cf_idsubs: "",
  cf_kasus: "",
  cf_inside: "",
  cf_outside: "",
};

async function getAllCF(x) {
  if (x == "Sangat Yakin") {
    return 1;
  } else if (x == "Yakin") {
    return 0.8;
  } else if (x == "Cukup Yakin") {
    return 0.6;
  } else if (x == "Kurang Yakin") {
    return 0.4;
  } else if (x == "Tidak Tahu") {
    return 0.2;
  } else if (x == "Kurang Tidak Yakin") {
    return -0.4;
  } else if (x == "Cukup Tidak Yakin") {
    return -0.6;
  } else if (x == "Tidak Yakin") {
    return -0.8;
  } else if (x == "Sangat Tidak Yakin") {
    return -1;
  }
}

async function member() {
  const member = document.querySelector('input[name="member"]:checked').value;
  const id_subs = document.querySelector('input[name="id_subs"]:checked').value;
  const cf_1 = document.getElementById("cf_member").value;
  const cf_2 = document.getElementById("cf_idsubs").value;
  cf.cf_member = await getAllCF(cf_1);
  cf.cf_idsubs = await getAllCF(cf_2);
  let cf_rules_member_status;
  let nilai_min;

  if (member == "Ya" && id_subs == "Ya") {
    temp.member_status = "Ya";
    cf_rules_member_status = 0.8;
    nilai_min = Math.abs(Math.min(cf.cf_member, cf.cf_idsubs));
    cf_member_status = nilai_min * cf_rules_member_status;
  } else if (member == "Ya" && id_subs == "Tidak") {
    temp.member_status = "Tidak";
    cf_rules_member_status = 0.7;
    nilai_min = Math.abs(Math.min(cf.cf_member, cf.cf_idsubs));
    cf_member_status = nilai_min * cf_rules_member_status;
  } else if (member == "No") {
    temp.member_status = "Tidak";
    cf_rules_member_status = 0.65;
    nilai_min = Math.abs(Math.min(cf.cf_member, cf.cf_idsubs));
    cf_member_status = nilai_min * cf_rules_member_status;
  }
}

async function reason() {
  const kasus = document.getElementById("reason").value;
  const cf_3 = document.getElementById("cf_reason").value;
  cf.cf_kasus = await getAllCF(cf_3);

  if (kasus == "New Case") {
    temp.reason = "New Case";
  } else if (kasus == "Follow Up Case") {
    temp.reason = "Follow Up Case";
  } else if (kasus == "Information Other") {
    temp.reason = "Information Other";
  }
  cf_reason = Math.abs(cf.cf_kasus);
}

async function problem() {
  const inside = document.querySelector('input[name="inside"]:checked').value;
  const outside = document.querySelector('input[name="outside"]:checked').value;
  const cf_4 = document.getElementById("cf_inside").value;
  const cf_5 = document.getElementById("cf_outside").value;
  cf.cf_inside = await getAllCF(cf_4);
  cf.cf_outside = await getAllCF(cf_5);
  let cf_rules_problem;
  let nilai_min;

  if (inside == "Ya") {
    temp.problem = "High Risk";
    cf_rules_problem = 0.9;
    nilai_min = Math.abs(Math.min(cf.cf_inside, cf.cf_outside));
    cf_problem = nilai_min * cf_rules_problem;
  } else if (inside == "Tidak" && outside == "Ya") {
    temp.problem = "High Risk";
    cf_rules_problem = 0.8;
    nilai_min = Math.abs(Math.min(cf.cf_inside, cf.cf_outside));
    cf_problem = nilai_min * cf_rules_problem;
  } else if (inside == "Tidak" && outside == "Tidak") {
    temp.problem = "No Risk";
    cf_rules_problem = 0.6;
    nilai_min = Math.abs(Math.min(cf.cf_inside, cf.cf_outside));
    cf_problem = nilai_min * cf_rules_problem;
  }
}

async function recommendation_support() {
  await member();
  await reason();
  await problem();
  let support = "";
  let rules_support;

  if (temp.member_status == "Ya" && temp.reason == "New Case" && temp.problem == "High Risk") {
    support = "Level High Support";
    rules_support = 0.9;
    let nilai_min = Math.abs(Math.min(cf_member_status, cf_reason, cf_problem));
    cf_support = nilai_min * rules_support;
    swal(`Rekomendasi support untuk permasalahan anda adalah "${support}"`, `nilai kepercayaan ${cf_support}`);
  } else if (temp.member_status == "Ya" && temp.reason == "New Case" && temp.problem == "No Risk") {
    support = "Level Medium Support";
    rules_support = 0.85;
    let nilai_min = Math.abs(Math.min(cf_member_status, cf_reason, cf_problem));
    cf_support = nilai_min * rules_support;
    swal(`Rekomendasi support untuk permasalahan anda adalah "${support}"`, `nilai kepercayaan ${cf_support}`);
  } else if (temp.member_status == "Ya" && temp.reason == "Follow Up Case" && temp.problem == "High Risk") {
    support = "Level High Support";
    rules_support = 1;
    let nilai_min = Math.abs(Math.min(cf_member_status, cf_reason, cf_problem));
    cf_support = nilai_min * rules_support;
    swal(`Rekomendasi support untuk permasalahan anda adalah "${support}"`, `nilai kepercayaan ${cf_support}`);
  } else if (temp.member_status == "Ya" && temp.reason == "Follow Up Case" && temp.problem == "No Risk") {
    support = "Level Standard Support";
    rules_support = 0.7;
    let nilai_min = Math.abs(Math.min(cf_member_status, cf_reason, cf_problem));
    cf_support = nilai_min * rules_support;
    swal(`Rekomendasi support untuk permasalahan anda adalah "${support}"`, `nilai kepercayaan ${cf_support}`);
  } else if (temp.member_status == "Ya" && temp.reason == "Information Other") {
    support = "Information Other";
    rules_support = 0.65;
    let nilai_min = Math.abs(Math.min(cf_member_status, cf_reason, cf_problem));
    cf_support = nilai_min * rules_support;
    swal(`Rekomendasi support untuk permasalahan anda adalah "${support}"`, `nilai kepercayaan ${cf_support}`);
  } else if (temp.member_status == "Tidak") {
    support = "Non Member Support";
    rules_support = 0.6;
    let nilai_min = Math.abs(Math.min(cf_member_status, cf_reason, cf_problem));
    cf_support = nilai_min * rules_support;
    swal(`Rekomendasi support untuk permasalahan anda adalah "${support}"`, `nilai kepercayaan ${cf_support}`);
  }
}
