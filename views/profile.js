const email = document.getElementById("email");
const fullname = document.getElementById("fullname");
const addrress = document.getElementById("addrress");
const phonenumber = document.getElementById("phonenumber");

const showProfile = async (req, res) => {
  try {
    const {
      data: { user },
    } = await axios.get("api/v1/user");
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
showProfile();
console.log("test");
