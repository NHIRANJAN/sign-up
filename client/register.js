const remail = document.querySelector("#remail");
const rpassword = document.querySelector("#rpassword");
const rconpassword = document.querySelector("#rconpassword");
const lemail = document.querySelector("#lemail");
const lpassword = document.querySelector("#lpassword");
const altbox = document.querySelector("#altbox");

var rinfo = {
  status: "",
  msg: "",
  class: "",
};

async function registerData() {
  const [vemail, vpassword, vconpassword] = [
    remail.value,
    rpassword.value,
    rconpassword.value,
  ];
  if (!vemail || !vpassword || !vconpassword) {
    rinfo.msg = "Enter Valid Information !!!";
    rinfo.class = "err";
    console.log(rinfo);
  } else if (vpassword != vconpassword) {
    rinfo.msg = "Password didn't Match !!!";
    rinfo.class = "err";
    console.log(rinfo);
  } else {
    const rawdata = await axios.post("http://127.0.0.1:9000/register", {
      email: vemail,
      password: vpassword,
    });
    const resdata = rawdata.data;
    rinfo.msg = resdata.msg;
    rinfo.class = resdata.class;
  }

  altbox.textContent = `${rinfo.msg}`;
  altbox.classList = `${rinfo.class}`;

  setTimeout(() => {
    altbox.classList = "hidden";
  }, 3000);
  console.log(rinfo);
}

var linfo = {
  status: "",
  msg: "",
  class: "",
};

async function loginData() {
  try {
    const [vlemail, vlpassword] = [lemail.value, lpassword.value];

    if (!vlemail || !vlpassword) {
      linfo.msg = "Enter Valid Information !!!";
      linfo.class = "err";
    } else {
      const rawdata = await axios.post("http://127.0.0.1:9000/login", {
        email: vlemail,
        password: vlpassword,
      });
      const resdata = rawdata.data;
      linfo.msg = `${resdata.msg}`;
      linfo.class = `${resdata.class}`;

      if (resdata.status == "noerr") {
        // !! After Validation Code Here
      }
    }

    altbox.textContent = `${linfo.msg}`;
    altbox.classList = `${linfo.class}`;

    setTimeout(() => {
      altbox.classList = "hidden";
    }, 3000);
    console.log(linfo);
  } catch (error) {
    console.log(error);
  }
}
