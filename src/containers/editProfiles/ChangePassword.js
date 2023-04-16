import { useState } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/change_password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response;
      
      if (response.ok) {
        setFormData({
          old_password: "",
          new_password: "",
          confirm_password: ""
        });
        setError("");
        alert("Password changed successfully");
      } else {
        setError(data.detail);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while changing password");
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      <h2>Change Password</h2>
        <div>
          <label htmlFor="old_password">Old Password</label>
          <input
            type="password"
            id="old_password"
            name="old_password"
            value={formData.old_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="new_password">New Password</label>
          <input
            type="password"
            id="new_password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
