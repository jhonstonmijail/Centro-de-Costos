var proc_apro_orde_nomb_cont = "proc_apro_orde/main/";
var proc_apro_orde_data_json = {};
var nomb_arch = "";
function proc_apro_orde() {
    //oculta el menu y oculta los iconos.
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    jQuery.ajaxSetup({async: true});
    jQuery.post(
            proc_apro_orde_nomb_cont + "apro_orde", {
                cache: Math.random()
            }, function (html) {

        jQuery("#apro_orde_tabl").remove();
        jQuery("#mainContenido").html(html);
        jQuery("#apro_orde_tabl").jqxWindow({
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

        jQuery('#apro_orde_tabl').jqxWindow('open');
        jQuery('#apro_orde_tabl').jqxWindow({content: 'CARGANDO ... '});
        proc_apro_orde_form();
    }
    );

}

function proc_apro_orde_form() {
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            proc_apro_orde_nomb_cont + "apro_orde_form", {
                cache: Math.random()
            }, function (html) {
        jQuery('#apro_orde_tabl').jqxWindow({content: html});
        jQuery("#apro_orde_tabl").on('close', function (event) {
            jQuery("head script:last-child").remove();
        });
        jQuery("#apro_orde_btn_apro,#apro_orde_btn_apro_desa,#apro_orde_btn_visu,#apro_orde_btn_limp,#apro_orde_btn_cerr").jqxButton({
            width: 100,
            height: 25,
            theme: tema
        });


        jQuery("#apro_orde_btn_cerr").click(function () {
            jQuery('#apro_orde_tabl').jqxWindow('close');
        });
        jQuery("#apro_orde_btn_apro").click(function () {
            apro_orde_apro();
        });
        jQuery("#apro_orde_btn_apro_desa").click(function () {
            apro_orde_desa();
        });

        jQuery("#apro_orde_btn_visu").click(function () {
            apro_orde_visu(nomb_arch);
        });
        jQuery("#apro_orde_btn_limp").click(function () {
            jQuery('#apro_orde_gril').jqxGrid('clearselection');
            jQuery("#apro_orde_lbl_mens").html("");
        });
        /*
         jQuery("#admi_copi_perm_btn_ayud").click(function(){
         admi_copi_perm_pdf();
         });
         */

        var apro_orde_data = new Array();
        var apro_orde_sour =
                {
                    localdata: apro_orde_data,
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
                                {name: 'tipo_mone', type: 'string'}
                            ]
                };
        var apro_orde_adap = new jQuery.jqx.dataAdapter(apro_orde_sour);
        jQuery("#apro_orde_gril").jqxGrid(
                {
                    width: jQuery("#apro_orde_tabl").width() - 15,
                    height: ((jQuery("#apro_orde_tabl").height())) - 180,
                    theme: tema,
                    source: apro_orde_adap,
                    columnsresize: true,
                    selectionmode: 'checkbox',
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
                        {text: 'MONEDA', dataField: 'tipo_mone'}
                    ]
                });
        jQuery("#apro_orde_gril").jqxGrid('localizestrings', localizationobj);
        jQuery('#apro_orde_gril').on('rowclick', function (event)
        {


            var args = event.args;
            var row = args.rowindex;
            var dataRecord = jQuery("#apro_orde_gril").jqxGrid('getrowdata', row);
            var indexRecord = jQuery("#apro_orde_gril").jqxGrid('getrowid', row);
            nomb_arch = dataRecord.nomb_arch;

        });


        apro_orde_gene();
    });
}

function apro_orde_gene() {
    jQuery('#apro_orde_gril').jqxGrid('clear');
    jQuery('#apro_orde_gril').jqxGrid('clearselection');
    jQuery('#apro_orde_gril').jqxGrid('showloadelement');
    jQuery("#apro_orde_gril").jqxGrid('refresh');
    jQuery("#apro_orde_lbl_mens").html('');

    jQuery.ajaxSetup({async: false});
    jQuery.post(
            proc_apro_orde_nomb_cont + "apro_orde_gene", {
                cache: Math.random()
            }, function (html) {
        if (html.mensaje !== "") {
            jQuery('#apro_orde_gril').jqxGrid('hideloadelement');
            jQuery("#apro_orde_lbl_mens").html(html.mensaje);
        } else {
            jQuery("#apro_orde_lbl_mens").html('');
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
                            {name: 'tipo_mone', type: 'string'}
                        ],
                        localdata: html.data
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            jQuery("#apro_orde_gril").jqxGrid({source: dataAdapter});
            apro_orde_data_json = jQuery("#apro_orde_gril").jqxGrid('exportdata', 'json');
        }
    }, "json")
            .fail(function (xhr, textStatus, errorThrown) {
                jQuery('#apro_orde_gril').jqxGrid('hideloadelement');
                main_erro("apro_orde_gene()", proc_apro_orde_nomb_cont + "apro_orde_gene", xhr.responseText, jQuery("#codi_usua").html())
                jQuery("#apro_orde_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
            });
}

function apro_orde_apro() {
    jQuery("#apro_orde_lbl_mens").html("");
    if (jQuery('#apro_orde_gril').jqxGrid('getselectedrowindexes') == "") {
        jQuery("#apro_orde_lbl_mens").html("* ERROR NO A SELECCIONADO A NINGUNA ORDEN PARA APROBAR.");
    } else {
        var inde = jQuery('#apro_orde_gril').jqxGrid('getselectedrowindexes');
        for (i = 0; i < inde.length; i++) {
            var dataRecord = jQuery("#apro_orde_gril").jqxGrid('getrowdata', inde[i]);

            jQuery.ajaxSetup({async: false});
            jQuery.post(
                    proc_apro_orde_nomb_cont + "apro_orde_apro", {
                        cache: Math.random(),
                        cons_orde: jQuery.trim(dataRecord.cons_orde)
                    }, function (html) {
                jQuery("#apro_orde_lbl_mens").html(html.mensaje);
            }, "json")
                    .fail(function (xhr, textStatus, errorThrown) {
                        main_erro("apro_orde_apro()", proc_apro_orde_nomb_cont + "apro_orde_apro", xhr.responseText, jQuery("#codi_usua").html())
                        jQuery("#apro_orde_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
                    });
        }
        apro_orde_gene();
        jQuery("#apro_orde_gril").jqxGrid('clearselection');
        jQuery('#apro_orde_gril').jqxGrid('clearfilters');
        jQuery("#apro_orde_lbl_mens").html(inde.length + " ORDENE(S) DE COMPRA HAN SIDO APROBADAS.");
    }


}

function apro_orde_desa() {
    jQuery("#apro_orde_lbl_mens").html("");
    if (jQuery('#apro_orde_gril').jqxGrid('getselectedrowindexes') == "") {
        jQuery("#apro_orde_lbl_mens").html("* ERROR NO A SELECCIONADO A NINGUNA ORDEN PARA DESAPROBAR.");
    } else {
        var inde = jQuery('#apro_orde_gril').jqxGrid('getselectedrowindexes');
        for (i = 0; i < inde.length; i++) {
            var dataRecord = jQuery("#apro_orde_gril").jqxGrid('getrowdata', inde[i]);

            jQuery.ajaxSetup({async: false});
            jQuery.post(
                    proc_apro_orde_nomb_cont + "apro_orde_desa", {
                        cache: Math.random(),
                        cons_orde: jQuery.trim(dataRecord.cons_orde)
                    }, function (html) {
                jQuery("#apro_orde_lbl_mens").html(html.mensaje);
            }, "json")
                    .fail(function (xhr, textStatus, errorThrown) {
                        main_erro("apro_orde_desa()", proc_apro_orde_nomb_cont + "apro_orde_desa", xhr.responseText, jQuery("#codi_usua").html())
                        jQuery("#apro_orde_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
                    });
        }
        apro_orde_gene();
        jQuery("#apro_orde_gril").jqxGrid('clearselection');
        jQuery('#apro_orde_gril').jqxGrid('clearfilters');
        jQuery("#apro_orde_lbl_mens").html(inde.length + " ORDENES DE COMPRA HAN SIDO DESAPROBADAS.");
    }


}

function apro_orde_visu(nomb_arch) {

    var arch_orde = nomb_arch + ".pdf";

    window.open(url + arch_orde, "_blank ", "top=1, left=1, width=1000, height=700,location=0,status=0,resizable=1, scrollbars=1");
}