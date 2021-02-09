//************** Xử lý Lưu trữ ***********
//************** Khai báo đường dẫn Dịch vụ  ***********
//var Dia_chi_Dich_vu = "http://localhost:1000"
var Dia_chi_Dich_vu = "https://phuong-data.herokuapp.com"
var Dia_chi_Media = "https://phuong-media.herokuapp.com"


//************** Các Hàm Xử lý Đọc Xuất   ***********


//đọc file local thành chuỗi!
function readFile(_url) {
    return new Promise((Resolve, Reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", _url, true);
        req.onload = () => {
            if (req.status === 200) {
                Resolve(req.responseText);
            } else {
                Reject("File loaded ERROR")
            }
        }
        req.send();
    })
}

//lấy Data từ database
function getData(thamSo) {
    return new Promise((Resolve, Reject) => {
        let xmr = new XMLHttpRequest()
        var url = `${Dia_chi_Dich_vu}?${thamSo}`
        xmr.open("POST", url, true);

        xmr.onload = () => {
            if (xmr.status === 200) {
                Resolve(JSON.parse(xmr.responseText));
            } else Reject("DATA loaded ERROR")
        }
        xmr.send();
    }
    )
}

// ***************************** Xuất ***********************
function xuatCuaHang(cuaHang) {
    let html = `
    <h2 class="mb-0 ">${cuaHang[0].Ten}</h2>
    <footer class="blockquote-footer"> <cite title="Source Title">Xin Chào</cite></footer>
    <footer class="blockquote-footer"> <cite title="Source Title">
            <i class="fa fa-envelope-o" aria-hidden="true"></i> : ${cuaHang[0].Dia_chi} <br>
            <i class="fa fa-phone" aria-hidden="true"></i>: <a href="${cuaHang[0].Dien_thoai}">${cuaHang[0].Dien_thoai}</a>
        </cite></footer>        
    `
    return html;
}

function xuatDienThoai(ds) {
    let html = ``
    ds.forEach(item => {
        html = html + `
                               <div class="col-6 col-md-3 col-xl-3 mb-1 mt-2">
                                <div class="card">
                                    <img class="card-img-top" src="${Dia_chi_Media}/${item.Ma_so}.png">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">${item.Ten}</h5>
                                        <p class="card-text">Giá: ${Tao_Chuoi_The_hien_So_nguyen_duong(item.Don_gia_Ban)}<sup>đ</sup></p>
                                      </div>                                 
                                    <a name="" id="" class="btn btn-primary" onclick="chiTietSanPham('${item.Ma_so}')" role="button"><i class="fa fa-shopping-cart text-center" aria-hidden="true"></i> &nbsp &nbsp <b>MORE INFO</b></a>
                                </div>
                            </div>
                                            `});
    Th_Dien_thoai.innerHTML = html;
    idAllDienThoai.innerHTML = `Số lượng: ${ds.length}`
}

function xuatIphone(ds) {
    let _ds = ds.concat();
    // lọc Iphone only
    _ds = _ds.filter(item => item.Nhom_Dien_thoai.Ma_so === "IPHONE");
    xuatDienThoai(_ds);
}

function xuatAndroid(ds) {
    let _ds = ds.concat();
    // lọc Android only
    _ds = _ds.filter(item => item.Nhom_Dien_thoai.Ma_so === "ANDROID");
    xuatDienThoai(_ds);
}

function chiTietSanPham(maSo) {
    let dienthoai = dsDienThoai.find(x => x.Ma_so == maSo);
    modalTitle.innerHTML = dienthoai.Ten
    let html = `
        <img src="${Dia_chi_Media}/${dienthoai.Ma_so}.png" class="img-fluid">
        <p class="text-danger">Đơn giá Bán: ${Tao_Chuoi_The_hien_So_nguyen_duong(dienthoai.Don_gia_Ban)}<sup>đ</sup></p>
    `
    modalBody.innerHTML = html;
    showModal.click()
}

function xuatDienThoaiNoiBat(ds) {
    let html = ``;
    let html_Items = ``;
    let dsMoi = ds.concat(); //tạo mảng nháp Mới
    dsMoi.sort((a, b) => b.Don_gia_Ban - a.Don_gia_Ban);

    html_Items = `
    <div class="carousel-item active">
    <img src="${Dia_chi_Media}/${dsMoi[0].Ma_so}.png" class="d-block w-100" alt="...">
    <div class="carousel-caption d-none d-md-block">
      <h5>${dsMoi[0].Ten}</h5>
      <p>${dsMoi[0].Don_gia_Ban}</p>
    </div>
    </div>
    `
    for (i = 1; i <= 4; i++) {
        html_Items = html_Items + `     
                          <div class="carousel-item">
                            <img src="${Dia_chi_Media}/${dsMoi[i].Ma_so}.png" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                            <h5>${dsMoi[i].Ten}</h5>
                            <p>${dsMoi[i].Don_gia_Ban}</p>
                            </div>
                          </div>
                          
    `
        html = `
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                          <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                          ${html_Items}
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="sr-only">Next</span>
                        </a>
                      </div>
    `

        Th_Hot_products.innerHTML = html;
    }
}

//************** Các Hàm Xử lý Số, Ngày    ***********

//==============================================================================
// Xử lý biến Số nguyên
function Nhap_So_nguyen_duong(Th_So_nguyen) {
    var Kq = {}
    Kq.So_nguyen = parseInt(Th_So_nguyen.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_nguyen) && Kq.So_nguyen > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 == 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 == 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 == 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien
}
// Xử lý Biến Số thực
function Nhap_So_thuc_duong(Th_So_thuc) {
    var Kq = {}
    Kq.So_thuc = parseInt(Th_So_thuc.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_thuc) && Kq.So_thuc > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_thuc_duong(So_thuc, So_so_le) {
    So_thuc = parseFloat(So_thuc)
    var Chuoi_The_hien = ""
    if (!So_so_le)
        So_so_le = 2
    var Thanh_phan_con = So_thuc
        .toFixed(So_so_le)
        .split(".")
    Chuoi_The_hien = Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[0])
    if (Thanh_phan_con.length == 2 && parseInt(Thanh_phan_con[1]) != 0 && So_so_le > 0)
        Chuoi_The_hien += "," + Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[1])
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Tien(So_tien, n) {
    if (!n)
        n = 0

    var Chuoi_The_hien = Tao_Chuoi_The_hien_So_thuc_duong(So_tien, n)

    return Chuoi_The_hien
}

// Xử lý với Biến Ngày
function La_Ngay_Hien_hanh(Ngay) {
    var Ngay_Hien_hanh = new Date()
    Ngay = new Date(Ngay)
    var Kq = Ngay_Hien_hanh.getDate() == Ngay.getDate() &&
        Ngay_Hien_hanh.getMonth() == Ngay.getMonth() &&
        Ngay_Hien_hanh.getFullYear() == Ngay.getFullYear()

    return Kq
}

function Tao_Chuoi_The_hien_Ngay(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getDate() + "/" + (Ngay.getMonth() + 1) + "/" + Ngay.getFullYear()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Gio(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getHours() + ":" + Ngay.getMinutes() + ":" + Ngay.getMinutes()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Ngay_Gio(Ngay) {
    var Chuoi_The_hien = Tao_Chuoi_The_hien_Ngay(Ngay) + " " + Tao_Chuoi_The_hien_Gio(Ngay)
    return Chuoi_The_hien
}

function Kiem_tra_Ngay(Chuoi_ngay) {
    var Thanh_phan_con = Chuoi_ngay.split("/")
    var Hop_le = Thanh_phan_con.length == 3 && !isNaN(Thanh_phan_con[0]) && !isNaN(Thanh_phan_con[1]) && !isNaN(Thanh_phan_con[2])
    if (Hop_le) {
        var Ng = parseInt(Thanh_phan_con[0])
        var Th = parseInt(Thanh_phan_con[1])
        var Nm = parseInt(Thanh_phan_con[2])
        var So_ngay_cua_Th = new Date(Nm, Th, 0).getDate()
        // var So_ngay_cua_Th = new Date(Nm, Th+1 , 0).getDate()
        Hop_le = Ng >= 1 && Ng <= So_ngay_cua_Th && Th >= 1 && Th <= 12 && Nm > 0
    }
    return Hop_le
}

function Nhap_Ngay(Th_Ngay) {
    var Kq = {}
    var Chuoi_Ngay = Th_Ngay
        .value
        .trim()
    Kq.Hop_le = Kiem_tra_Ngay(Chuoi_Ngay)
    if (Kq.Hop_le) {
        var Thanh_phan_con = Chuoi_ngay.split("/")
        Kq.Ngay = new Date(Thanh_phan_con[1] + "-" + Thanh_phan_con[0] + "-" + Thanh_phan_con[2])
    }
    return Kq
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("file-link");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("file-link");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

// function Doc_File(_duongLink) {
//     let Xu_ly_HTTP = new XMLHttpRequest();
//     Xu_ly_HTTP.open("GET", _duongLink, false);
//     Xu_ly_HTTP.send();
//     let noiDung = Xu_ly_HTTP.responseText;
//     return noiDung;
// }


function XL_Upload() {
    var Ngay = Tao_Chuoi_The_hien_Ngay()
    Ngay = Ngay.replace(/[/]/g, "_")
    var Ma_so = `Don_Xin_Ung_tuyen-${Ngay}-${Th_Dien_thoai.value}.pdf`
    var reader = new FileReader();
    var Du_lieu_pdf = "";
    reader.onload = function (e) {
        Du_lieu_pdf = e.target.result;
        var Du_lieu = { "Chuoi_nhi_phan": Du_lieu_pdf, "Ten": Ma_so };
        var Xu_ly_HTTP = new XMLHttpRequest()
        var Dia_chi_Xu_ly = `${Dia_chi_Media}/Ghi_PDF`
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
        var Chuoi_Goi = JSON.stringify(Du_lieu)
        Xu_ly_HTTP.send(Chuoi_Goi)
        var Chuoi_KQ = Xu_ly_HTTP.responseText
        if (Chuoi_KQ == "OK") {
            Th_Thong_bao.innerHTML = "Cửa hàng Chúng tôi đã nhận đơn của bạn.<br>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất"
        } else {
            Th_Thong_bao.innerHTML = "Cửa hàng Chúng tôi Không nhận được đơn của bạn.<br>Bạn liên hệ Chúng tôi qua số điện thoại: 0973.777.888"
        }
        Th_Close.click()
    }
    reader.readAsDataURL(Th_file.files[0]);
}

function Tao_the_hien_Upload(Th_Cha) {
    Th_Cha.innerHTML = ""
    var The_hien = document.createElement("table");
    Th_Cha.appendChild(The_hien);
    The_hien.className = "table table-bordered";
    var noi_dung = "";
    noi_dung += `<tr>`
    noi_dung += `<td>Họ Tên</td><td><input type="text" id="Th_Ten" style="width:20rem" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr>`
    noi_dung += `<td>Điện thoại</td><td><input type="text" id="Th_Dien_thoai" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr>`
    noi_dung += `<td>Tập tin (pdf)</td><td><input type="file" id="Th_file" /></td>`
    noi_dung += `</tr>`
    noi_dung += `<tr align="center">`
    noi_dung += `<td colspan=2><button class="btn btn-danger" onclick="XL_Upload()">Đồng ý</button> </td>`
    noi_dung += `</tr>`
    The_hien.innerHTML = noi_dung
}