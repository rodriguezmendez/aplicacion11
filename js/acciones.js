//acciones.js 
$(document).ready(function(e) 
{
    document.addEventListener("deviceready",function()
	{
		//se crea
		var db = openDatabase ("Test", "1.0", "Base de Prueba", 655335);
		
		$("#Crear").bind("click", function (event)
		{
			db.transaction (function (ejecutar)
			{
				var sql = "CREATE TABLE Clientes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL)";
				ejecutar.executeSql (sql, undefined, function ()
				{
					alert ("Tabla Creada");
				}, error);//executesql
			});//Ejecutar
		});//crear
		
		$("#Eliminar").bind("click", function (event)
		{
			if(!confirm("Borrar tabla?","")) return;
			db.transaction (function (transaction)
			{
				var sql = "DROP TABLE Clientes";
				transaction.executeSql (sql, undefined,function ()
				{
					alert ("Tabla Borrada");
				}, error);//executesql
			});//transaction
		});//Eliminar
		
		function error (transaction,err){
			alert ("Error en la base de datos : " +err.message);
			return false;
		}//function error
		
		$("#Insertar").bind("click", function (event)
		{
			var v_nombre = $("#Nombre").val();
			var v_apellido = $("#Apellido").val();
			db.transaction (function (ejecutar)
			{
				var sql = "INSERT INTO Clientes (nombre, apellido) VALUES (?, ?)";
				ejecutar.executeSql (sql, [v_nombre, v_apellido], function ()
				{
					alert ("Cliente Agregado");
				}, error);
			});//ejecutar
		});//insertar
		
		$("#Listar").bind("click", function (event)
		{
			db.transaction (function (ejecutar)
			{
				var sql = "SELECT * FROM Clientes";
				ejecutar.executeSql (sql, undefined,function (ejecutar, resultado)
				{
					var a_html = "<ul>";
					if(resultado.rows.length)
					{
						for (var i = 0; i < resultado.rows.length; i++)
						{
							var fila = resultado.rows.item (i);
							
							var v_nombre = fila.nombre;
							var v_apellido = fila.apellido;
							
							a_html += "<li>" + v_nombre + "&nbsp;" + v_apellido + "</li>";
						}
					}//if
					else
					{
						a_html += "<li> No hay Clientes </li>";
					}//else
					a_html += "</ul>";
					
					$("#listado").unbind ().bind ("pagebeforeshow", function ()
					{
						//ubicate en el contenido del listado
						var $contenido = $("#listado div:jqmData(role=content)");
						//agregar <ul> <li>     </li> .... </ul>
						$contenido.html (a_html);
						var $ul = $contenido.find ("ul");
						//En lugar de viñetas salga en forma de lista
						$ul.listview();
					});//listado
					$.mobile.changePage ($("#listado"));
				}, error);//Resultado
			});//ejecutar
		});//listar
		
	}, false);//DeviceReady
});//Document
