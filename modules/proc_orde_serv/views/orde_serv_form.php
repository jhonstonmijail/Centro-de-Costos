<table border="0" width="100%" cellpadding="0" cellspacing="0">
    <tr height="40">
        <td height="40" align="right">
            <input type="button" value="REGISTRAR" id='proc_orde_serv_btn_gene' />
            <input type="button" value="LIMPIAR" id='proc_orde_serv_btn_limp' />
            <input type="button" value="CERRAR" id='proc_orde_serv_btn_cerr' />
        </td>
    </tr>
    <tr>
        <td>
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr height="35">
                    <td width="5"></td>
                    <td width="20">SOLICITANTE</td>
                    <td width="5">:</td>
                    <td width="50"><input type="text" id="proc_come_orde_txt_nomb_soli"/></td>     
                    <td width="10"></td>
                    <td width="20">CORREO</td>
                    <td width="5">:</td>
                    <td width="50"><input type="email" id="proc_come_orde_txt_corr_soli"/></td>  
                    <td width="10"></td>
                    <td width="50">TELEFONO</td>
                    <td width="5">:</td>
                    <td width="50"><input type="text" id="proc_come_orde_txt_nume_soli" /></td> 
                </tr>
                <tr height="30">
                    <td width="5"></td>
                    <td width="20">RUC</td>
                    <td width="5">:</td>
                    <td ><input type="text" id="proc_come_orde_txt_nume_rucc"/></td> 
                    <td width="5"></td>
                    <td width="20">PROVEEDOR</td>
                    <td width="5">:</td>
                    <td ><input type="text" id="proc_come_orde_txt_nomb_prov"/></td>   
                    <td width="10"></td>
                    <td width="50">CORREO</td>
                    <td width="5">:</td>
                    <td ><input type="email" id="proc_come_orde_txt_corr_prov"/></td> 
                    
                </tr>
                <tr height="30">
                    <td width="5"></td>
                    <td width="20">CONTACTO</td>
                    <td width="5">:</td>
                    <td><input type="text" id="proc_come_orde_txt_cont_prov"/></td> 
                    <td width="5"></td>
                    <td width="20">TELEFONO</td>
                    <td width="5">:</td>
                    <td><input type="text" id="proc_come_orde_txt_telf_prov" onkeypress='return vent_gene_orde_comp_solo_nume(event)'/></td> 
                    <td width="10"></td>
                    <td width="50">DIRECCION</td>
                    <td width="5">:</td>
                    <td><input type="text" id="proc_come_orde_txt_dire_prov"/></td> 
                </tr>
                <tr height="30">
                    <td width="5"></td>
                    <td width="20">CIUDAD</td>
                    <td width="5">:</td>
                    <td><input type="text" id="proc_come_orde_txt_ciud_prov"/></td>
                    <td width="5"></td>
                    <td width="20">LUGAR DE ENTREGA</td>
                    <td width="5">:</td>
                    <td><input type="text" id="proc_come_orde_txt_luga_entr"/></td>  
                    <td width="10"></td>
                    <td width="50">CONDICION DE PAGO</td>
                    <td width="5">:</td>
                    <td><input type="text" id="proc_come_orde_txt_cond_pago"/></td>  
                </tr>
                <tr height="30">
                    <td width="5"></td>
                    <td width="20">MONEDA</td>
                    <td width="5">:</td>
                    <td><div id="proc_come_orde_txt_tipo_mone"></div></td>
                    <td width="5"></td>
                    <td width="20">CENTRO DE COSTOS</td>
                    <td width="5">:</td>
                    <td><div id="proc_come_orde_txt_cent_cost"></div></td>
                    <td width="10"></td>
                    <td width="50">USUARIO APROBADOR</td>
                    <td width="5">:</td>
                    <td><div id="proc_come_orde_txt_usua_apro"></div></td>
                </tr>
          
                <tr height="30">
                    <td width="5"></td>
                    <td width="20">CODIGO</td>
                    <td width="5">:</td>
                    <td ><input type="text" id="proc_orde_serv_txt_codi_prod" /></td>
                    <td width="5"></td>
                    <td width="20">DESCRIPCION</td>
                    <td width="5">:</td>
                    <td colspan="4"><input type="text" id="proc_orde_serv_txt_nomb_prod" /></td> 
                </tr>
                <tr height="30">
                    <td width="5"></td>
                    <td width="20">U. MEDIDA</td>
                    <td width="5">:</td>
                    <td ><input type="text" id="proc_orde_serv_txt_unid_medi" /></td> 
                    <td width="5"></td>
                    <td width="20">CANTIDAD</td>
                    <td width="5">:</td>
                    <td ><input type="text" id="proc_orde_serv_txt_cant_prod" /></td> 
                     <td width="10"></td>
                    <td width="50">PRECIO</td>
                    <td width="5">:</td>
                    <td><input type="text" id="proc_orde_serv_txt_prec_neto" /></td> 
                </tr>
                 <tr height="30">
                    <td width="5"></td>
                    <td width="20">TOTAL NETO</td>
                    <td width="5">:</td>
                    <td ><input type="text" id="proc_orde_serv_txt_tota_neto" /></td> 
                    <td width="5"></td>
                    <td width="20">TOTAL IVAA</td>
                    <td width="5">:</td>
                    <td ><input type="text" id="proc_orde_serv_txt_tota_ivaa" /></td> 
                     <td width="10"></td>
                    <td width="50">TOTAL ORDEN</td>
                    <td width="5">:</td>
                    <td><input type="text" id="proc_orde_serv_txt_tota_orde" /></td> 
                </tr>
                <tr height="22">
                     <td colspan="12"><div id="proc_orde_serv_prod_gril"></div></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr height="22">
        <td>
            <div id="proc_orde_serv_lbl_mens" class="main_mens"></div>
        </td>
    </tr>
</table>