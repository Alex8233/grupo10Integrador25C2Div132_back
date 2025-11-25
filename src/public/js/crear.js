let altaProducts_form = document.getElementById("altaProducts-form");
        let url = "http://localhost:3000/productos";
        altaProducts_form.addEventListener("submit", event =>{
            event.preventDefault();
            console.log(event.target);
            let formData =new FormData(event.target);
            let data = Object.fromEntries(formData.entries());
            console.log(JSON.stringify(data));
            console.log(data);
            enviarProducto(data);
        });
        async function enviarProducto(data) {
            try{
                let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify(data)
                });
                let result = await response.json();
                console.log(result);
                if(response.ok) {
                    console.log(result.message);
                    alert(result.message);

                } else { 
                    console.error(result.message);
                    alert(result.message);
                }
            }
            catch(error){
                console.error("Error al enviar los datos: ", error)
                alert("Error al guardar el producto")
            }
        }