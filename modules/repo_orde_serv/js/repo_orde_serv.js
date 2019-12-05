var repo_orde_serv_nomb_cont = "repo_orde_serv/main/";
var repo_orde_serv_data_json = {};

function repo_orde_serv() {
    //oculta el menu y oculta los iconos.
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    jQuery.ajaxSetup({async: true});
    jQuery.post(
            repo_orde_serv_nomb_cont + "orde_serv", {
                cache: Math.random()
            }, function (html) {

        jQuery("#repo_orde_serv_tabl").remove();
        jQuery("#mainContenido").html(html);
        jQuery("#repo_orde_serv_tabl").jqxWindow({
            autoOpen: false,
            width: jQuery(window).width() - 80,
            maxWidth: 1200,
            height: jQuery(window).height() - 150,
            showCollapseButton: true,
            theme: tema,
            resizable: false,
            draggable: true,
            showCloseButton: true,
            dragArea: {left: 0, top: 80, width: jQuery(window).width(), height: jQuery(window).height() - 80}
        });

        jQuery('#repo_orde_serv_tabl').jqxWindow('open');
        jQuery('#repo_orde_serv_tabl').jqxWindow({content: 'CARGANDO ... '});
        repo_orde_serv_form();
    }
    );

}

function repo_orde_serv_form() {
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            repo_orde_serv_nomb_cont + "orde_serv_form", {
                cache: Math.random()
            }, function (html) {
        jQuery('#repo_orde_serv_tabl').jqxWindow({content: html});
        jQuery("#repo_orde_serv_tabl").on('close', function (event) {
            jQuery("head script:last-child").remove();
        });
        jQuery("#repo_orde_serv_btn_gene,#repo_orde_serv_btn_limp,#repo_orde_serv_btn_cerr").jqxButton({
            width: 100,
            height: 25,
            theme: tema
        });


        jQuery("#repo_orde_serv_btn_cerr").click(function () {
            jQuery('#repo_orde_serv_tabl').jqxWindow('close');
        });
        jQuery("#repo_orde_serv_btn_gene").click(function () {
            repo_orde_gene();
        });

        jQuery("#repo_orde_serv_btn_limp").click(function () {
            jQuery('#repo_orde_serv_gril').jqxGrid('clearselection');
            jQuery("#repo_orde_serv_lbl_mens").html("");
        });

        var repo_orde_data = new Array();
        var repo_orde_sour =
                {
                    localdata: repo_orde_data,
                    datatype: "array",
                    datafields:
                            [
                                {name: 'cons_fila', type: 'string'},
                                {name: 'cons_orde', type: 'string'},
                                {name: 'soli_orde', type: 'string'},
                                {name: 'prov_orde', type: 'string'},
                                {name: 'nomb_cent', type: 'string'},
                                {name: 'cond_pago', type: 'string'},
                                {name: 'tota_orde', type: 'string'},
                                {name: 'nomb_arch', type: 'string'},
                                {name: 'tipo_mone', type: 'string'},
                                {name: 'esta_orde', type: 'string'}
                            ]
                };
        var repo_orde_adap = new jQuery.jqx.dataAdapter(repo_orde_sour);
        jQuery("#repo_orde_serv_gril").jqxGrid(
                {
                    width: jQuery("#repo_orde_serv_tabl").width() - 15,
                    height: ((jQuery("#repo_orde_serv_tabl").height())) - 180,
                    theme: tema,
                    source: repo_orde_adap,
                    columnsresize: true,
             
                    sortable: true,
                    filterable: true,
                    altrows: true,
                    showemptyrow: false,
                    columnsreorder: true,
                    columns: [
                        {text: 'FILA', dataField: 'cons_fila', width: 50},
                        {text: 'CODIGO', dataField: 'cons_orde', width: 50},
                        {text: 'SOLICITANTE', dataField: 'soli_orde'},
                        {text: 'PROVEEDOR', dataField: 'prov_orde'},
                        {text: 'CENTRO DE COSTOS', dataField: 'nomb_cent', width: 200},
                        {text: 'CONDICION DE PAGO', dataField: 'cond_pago', width: 200},
                        {text: 'COSTO', dataField: 'tota_orde', width: 100},
                        {text: 'ARCHIVO', dataField: 'nomb_arch'},
                        {text: 'MONEDA', dataField: 'tipo_mone'},
                        {text: 'ESTADO', dataField: 'esta_orde'}
                    ]
                });
        jQuery("#repo_orde_serv_gril").jqxGrid('localizestrings', localizationobj);
        jQuery('#repo_orde_serv_gril').on('rowclick', function (event)
        {


            var args = event.args;
            var row = args.rowindex;
            var dataRecord = jQuery("#repo_orde_serv_gril").jqxGrid('getrowdata', row);
            var indexRecord = jQuery("#repo_orde_serv_gril").jqxGrid('getrowid', row);
            var nomb_arch = dataRecord.nomb_arch;
            repo_orde_visu(nomb_arch);
        });


        repo_orde_gene();
    });
}

function repo_orde_gene() {
    jQuery('#repo_orde_serv_gril').jqxGrid('clear');
    jQuery('#repo_orde_serv_gril').jqxGrid('clearselection');
    jQuery('#repo_orde_serv_gril').jqxGrid('showloadelement');
    jQuery("#repo_orde_serv_gril").jqxGrid('refresh');
    jQuery("#repo_orde_serv_lbl_mens").html('');

    jQuery.ajaxSetup({async: false});
    jQuery.post(
            repo_orde_serv_nomb_cont + "orde_serv_gene", {
                cache: Math.random()
            }, function (html) {
        if (html.mensaje !== "") {
            jQuery('#repo_orde_serv_gril').jqxGrid('hideloadelement');
            jQuery("#repo_orde_serv_lbl_mens").html(html.mensaje);
        } else {
            jQuery("#repo_orde_serv_lbl_mens").html('');
            var source =
                    {
                        datatype: "json",
                        datafields: [
                            {name: 'cons_fila', type: 'string'},
                            {name: 'cons_orde', type: 'string'},
                            {name: 'soli_orde', type: 'string'},
                            {name: 'prov_orde', type: 'string'},
                            {name: 'nomb_cent', type: 'string'},
                            {name: 'cond_pago', type: 'string'},
                            {name: 'tota_orde', type: 'string'},
                            {name: 'nomb_arch', type: 'string'},
                            {name: 'tipo_mone', type: 'string'},
                            {name: 'esta_orde', type: 'string'}

                        ],
                        localdata: html.data
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            jQuery("#repo_orde_serv_gril").jqxGrid({source: dataAdapter});
            repo_orde_serv_data_json = jQuery("#repo_orde_serv_gril").jqxGrid('exportdata', 'json');
        }
    }, "json")
            .fail(function (xhr, textStatus, errorThrown) {
                jQuery('#repo_orde_serv_gril').jqxGrid('hideloadelement');
                main_erro("repo_orde_gene()", repo_orde_serv_nomb_cont + "repo_orde_gene", xhr.responseText, jQuery("#codi_usua").html())
                jQuery("#repo_orde_serv_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
            });
}



function repo_orde_visu(nomb_arch) {

    var arch_orde = nomb_arch + ".pdf";

    window.open(url + arch_orde, "_blank ", "top=1, left=1, width=1000, height=700,location=0,status=0,resizable=1, scrollbars=1");
}