$(document).ready(function () {
  var modal = new bootstrap.Modal(document.getElementById('addModal'));

  $("#btnAdd").click(function () {
    $("#addForm")[0].reset();
    $(".text-danger").text(""); // clear lỗi
    modal.show();
  });

  $("#addForm").submit(function (e) {
    e.preventDefault();

    const ten = $("input[name='ten']").val().trim();
    const hodem = $("input[name='hodem']").val().trim();
    const diachi = $("input[name='diachi']").val().trim();

    let isValid = true;

    // Reset lỗi
    $("#errTen, #errHodem, #errDiachi").text("");

    // Kiểm tra từng trường
    if (ten === "") {
      $("#errTen").text("Tên không được bỏ trống");
      isValid = false;
    } else if (ten.length > 15) {
      $("#errTen").text("Tên không được vượt quá 15 ký tự");
      isValid = false;
    }

    if (hodem === "") {
      $("#errHodem").text("Họ đệm không được bỏ trống");
      isValid = false;
    } else if (hodem.length > 20) {
      $("#errHodem").text("Họ đệm không được vượt quá 20 ký tự");
      isValid = false;
    }

    if (diachi === "") {
      $("#errDiachi").text("Địa chỉ không được bỏ trống");
      isValid = false;
    } else if (diachi.length > 50) {
      $("#errDiachi").text("Địa chỉ không được vượt quá 50 ký tự");
      isValid = false;
    }

    // Nếu hợp lệ thì thêm dòng mới
    if (isValid) {
      const newRow = `
        <tr>
          <td><i class="bi bi-caret-down-square"></i></td>
          <td>
            <button class="btn btn-sm btn-primary"><i class="bi bi-eye"></i></button>
            <button class="btn btn-sm btn-warning"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-danger"><i class="bi bi-x-circle"></i></button>
          </td>
          <td>${$("table tbody tr").length + 1}</td>
          <td>${ten}</td>
          <td>${hodem}</td>
          <td>${diachi}</td>
          <td><i class="bi bi-check-circle text-success"></i></td>
        </tr>
      `;
      $("table tbody").append(newRow);
      modal.hide();
    }
  });
});
