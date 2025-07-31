function openModal() {
  document.getElementById("popupForm").style.display = "block";
}
function closeModal() {
  document.getElementById("popupForm").style.display = "none";
  clearInputs();
  clearErrors();
}
function clearInputs() {
  document.getElementById("khachHang").value = "";
  document.getElementById("nhanVien").value = "";
  document.getElementById("soTien").value = "";
}
function clearErrors() {
  document.getElementById("errKH").innerText = "";
  document.getElementById("errNV").innerText = "";
  document.getElementById("errST").innerText = "";
}
function submitForm(){ 
  const kh = document.getElementById("khachHang").value.trim();
  const nv = document.getElementById("nhanVien").value.trim();
  const st = document.getElementById("soTien").value.trim();
  clearErrors();
  let valid = true;

  if (!kh) {
    document.getElementById("errKH").innerText = "Vui lòng nhập khách hàng";
    valid = false;
  }else if (kh.length > 30) {
    document.getElementById("errKH").innerText = "Tên khách hàng không được vượt quá 30 ký tự!";
    valid = false;
  }
  if (!nv) {
    document.getElementById("errNV").innerText = "Vui lòng nhập nhân viên";
    valid = false;
  }else if (nv.length > 30) {
    document.getElementById("errNV").innerText = "Tên nhân viên không được vượt quá 30 ký tự!";
    valid = false;
  }
  if (!st || isNaN(st) || Number(st) <= 0) {
    document.getElementById("errST").innerText = "Số tiền phải lớn hơn 0";
    valid = false;
  }else if (isNaN(st) || Number(st) <= 0) {
    document.getElementById("errST").innerText = "Số tiền phải là số và lớn hơn 0!";
    valid = false;
  }
  if (valid) {
    const today = new Date().toLocaleString("vi-VN");
    const maID = Math.floor(Math.random() * 9000 + 1000);
    const table = document.getElementById("tableBody");
    const row = table.insertRow();
    const now = new Date().toLocaleDateString("vi-VN");

    row.innerHTML = `
      <td>${table.rows.length}</td>
      <td>${kh}</td>
      <td>${nv}</td>
      <td>${parseInt(st).toLocaleString()}</td>
      <td>${now}</td>
      <td>
        <button onclick="alert('Sửa')" class="edit-btn">✎</button>
        <button onclick="alert('Xem')" class="view-btn">👁</button>
        <button onclick="row.remove()" class="delete-btn">🗑</button>
      </td>
    `;

    closeModal();
  }
}
function clearErrors() {
  document.getElementById("errKH").innerText = "";
  document.getElementById("errNV").innerText = "";
  document.getElementById("errST").innerText = "";
}
  

// Đóng modal khi bấm ra ngoài
window.onclick = function(event) {
  const modal = document.getElementById("popupForm");
  if (event.target == modal) {
    closeModal();
  }
}
let dataRows = []; // Danh sách dữ liệu toàn bộ
let currentPage = 1;
let rowsPerPage = 5;

// Mỗi khi thêm dòng mới
function submitForm() {
  const kh = document.getElementById("khachHang").value.trim();
  const nv = document.getElementById("nhanVien").value.trim();
  const st = document.getElementById("soTien").value.trim();
  clearErrors();
  let valid = true;

  if (!kh) {
    document.getElementById("errKH").innerText = "Vui lòng nhập khách hàng";
    valid = false;
  }
  if (!nv) {
    document.getElementById("errNV").innerText = "Vui lòng nhập nhân viên";
    valid = false;
  }
  if (!st || isNaN(st) || Number(st) <= 0) {
    document.getElementById("errST").innerText = "Số tiền phải lớn hơn 0";
    valid = false;
  }

  if (valid) {
    const today = new Date().toLocaleString("vi-VN");
    const maID = Math.floor(Math.random() * 9000 + 1000);

    dataRows.push({
      id: maID,
      khachHang: kh,
      nhanVien: nv,
      soTien: parseInt(st).toLocaleString(),
      ngay: today
    });

    closeModal();
    renderTable();
  }
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const filtered = filterData();
  const pageData = filtered.slice(start, end);

  pageData.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${row.khachHang}</td>
      <td>${row.nhanVien}</td>
      <td>${row.soTien}</td>
      <td>${row.ngay}</td>
      <td>
        <button class="edit-btn">✎</button>
        <button class="view-btn">👁</button>
        <button class="delete-btn" onclick="deleteRow(${start + index})">🗑</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updateResultInfo(filtered.length);
}

function filterData() {
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  return dataRows.filter(r => r.khachHang.toLowerCase().includes(keyword));
}

function searchTable() {
  currentPage = 1;
  renderTable();
}

function changeRowsPerPage() {
  rowsPerPage = parseInt(document.getElementById("rowsPerPage").value);
  currentPage = 1;
  renderTable();
}

function updateResultInfo(total) {
  const totalPages = Math.ceil(total / rowsPerPage);
  document.querySelector(".result-info").innerText = `Kết quả ${currentPage} trong ${totalPages} trang`;
}

function deleteRow(index) {
  dataRows.splice(index, 1);
  renderTable();
}

function exportToCSV() {
  let csv = "ID,Khách hàng,Nhân viên,Số tiền,Ngày\n";
  dataRows.forEach(r => {
    csv += `${r.id},${r.khachHang},${r.nhanVien},${r.soTien},${r.ngay}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "giao_dich.csv";
  a.click();
  window.onload = function() {
  dataRows = [...giaoDichData]; // lấy dữ liệu từ file data.js
  renderTable();
};
}
