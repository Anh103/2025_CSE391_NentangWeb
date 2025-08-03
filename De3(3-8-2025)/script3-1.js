$(document).ready(function() {
    var modal = new bootstrap.Modal(document.getElementById('addModal'));

    $("#btnAdd").click(function() {
        $("#addForm")[0].reset(); // Xóa form
        modal.show();
    });

    $("#addForm").submit(function(e) {
        e.preventDefault();
        const ten = $("input[name='ten']").val();
        const hodem = $("input[name='hodem']").val();
        const diachi = $("input[name='diachi']").val();

        const newRow = `
            <tr>
                <td>
                    <button class="btn btn-warning btn-sm">Sửa</button>
                    <button class="btn btn-danger btn-sm">Xóa</button>
                </td>
                <td></td>
                <td>${ten}</td>
                <td>${hodem}</td>
                <td>${diachi}</td>
            </tr>
        `;

        $("table tbody").append(newRow);
        modal.hide();
    });
});
