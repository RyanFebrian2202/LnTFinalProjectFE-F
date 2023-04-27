const firebaseConfig = {
    apiKey: "AIzaSyAlqtE3Ycsdy4HDeAo0xofEqetNEnIbk-8",
    authDomain: "lntfinalproject-42c25.firebaseapp.com",
    projectId: "lntfinalproject-42c25",
    storageBucket: "lntfinalproject-42c25.appspot.com",
    messagingSenderId: "151278560848",
    appId: "1:151278560848:web:6f38e2dd96f9e666d01355",
    measurementId: "G-M6R0JVR1DZ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const registrantCollection = db.collection("RegistrantData")

jQuery.validator.addMethod("nomorStartsWith08", function (nomor, element) {
    nomor = nomor.replace(/\s+/g, "");
    return this.optional(element) || nomor.match(/^08\d{0,}$/);
}, "Nomor telepon harus dimulai dengan 08");

$(document).ready(function () {

    var $email = $('#email');
    var $nama = $('#nama');
    var $nomor = $('#nomor');
    var $event = $('#event');

    $("#Form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            nama: {
                required: true,
                minlength: 3
            },
            nomor: {
                required: true,
                maxlength: 14,
                number: true,
                nomorStartsWith08: true
            },
            event: {
                required: true
            }
        },
        messages: {
            email: {
                email: "Format email salah, harus ada @",
                required: "Email harus diisi"
            },
            nama: {
                minlength: "Nama minimal 3 huruf",
                required: "Nama harus diisi"
            },
            nomor: {
                minlength: "Tidak boleh lebih dari 14 angka",
                required: "Nomor telepon harus diisi",
                number: "Harus diisi dengan angka",
                nomorStartsWith08: "Nomor harus dimulai dengan 08"
            },
            event: {
                required: "Harus memilih salah satu event"
            }
        },
    });

    $('#Form').submit(function(e){
        e.preventDefault();
        
        if ($("#Form").valid()) {
            var data = {
                email: $email.val(),
                nama: $nama.val(),
                nomor: $nomor.val(),
                event: $event.val()
            };
    
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                method: "POST",
                data: data,
                success: function (response) {
                    console.log(response);
                }
            });
    
            registrantCollection.add(data)
                .then(doc => {
                    console.log("Data berhasil ditambahkan, ID:", doc.id);
                })
                .catch(e => {
                    console.error("Error menambahkan data:", e);
                });
            
            $("#Form")[0].reset();
            alert("Data sudah terekam, terima kasih sudah registrasi")

        } else{
            //
        }
    });
})