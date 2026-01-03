fetch("/employee")
  .then(res => res.json())
  .then(data => {
    if (document.getElementById("name")) {
      document.getElementById("name").innerText = data.name;
      document.getElementById("phone").innerText = data.phone;
      document.getElementById("address").innerText = data.address;
      document.getElementById("designation").innerText = data.designation;
      document.getElementById("department").innerText = data.department;
      document.getElementById("salary").innerText = data.salary;
    }
  });
