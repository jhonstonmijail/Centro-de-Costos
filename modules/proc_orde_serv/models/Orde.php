<?php

class Orde extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function orde_regi($soli_orde, $corr_soli, $telf_soli, $prov_orde, $telf_prov, $rucc_prov, $cont_prov, $ciud_prov, $dire_prov, $corr_prov, $luga_entr, $cond_pago, $tipo_mone, $cent_cost, $apro_orde, $tota_neto, $tota_ivaa, $tota_orde, $acti_usua, $deta_prod) {
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query = "select nume_cent,nume_orde_cent from tab_cent_cost where nume_cent='$cent_cost'";
        $data_docu = $this->db->query($query);
        $data_docu_deta = $data_docu->result();

        $cons_orde_seri = $data_docu_deta[0]->nume_orde_cent;
        $cons_orde_seri = $cons_orde_seri + 1;
        $query = "update tab_cent_cost set nume_orde_cent='$cons_orde_seri' where nume_cent='$cent_cost'";
        $this->db->query($query);


        $query = "insert into comp_orde(
                    
                    soli_orde,
                    corr_soli,
                    telf_soli,
                    prov_orde,
                    telf_prov,
                    rucc_prov,
                    cont_prov,
                    fech_orde,
                    ciud_prov,
                    dire_prov,
                    corr_prov,

                    luga_entr ,
                    cond_pago ,
                    tipo_mone ,
                    cent_cost ,
                    apro_orde ,
                    tota_neto ,       
                    tota_ivaa , 
                    tota_orde,
                    nume_orde,
                    esta_orde,
                    acti_hora_apro,
                    acti_usua,
                    acti_hora) values (
                    '$soli_orde',
                    '$corr_soli',
                    '$telf_soli',
                    '$prov_orde',
                    '$telf_prov',
                    '$rucc_prov',
                    '$cont_prov',
                    NOW(),
                    '$ciud_prov',
                    '$dire_prov',
                    '$corr_prov',

                    '$luga_entr',
                    '$cond_pago',
                    '$tipo_mone',
                  
                    '$cent_cost',
                    '$apro_orde',
                    '$tota_neto',
                    '$tota_ivaa',
                    '$tota_orde',
                    '$cons_orde_seri',
                        'PEN',
                        '',
                    '$acti_usua',                         
                   NOW()
                    )";
        $this->db->query($query);
        for ($i = 0; $i < count($deta_prod); $i++) {




            $codi_prod = $deta_prod[$i]->CODIGO;
            $nomb_prod = mb_strtoupper(trim($deta_prod[$i]->PRODUCTO), 'UTF-8');
            $unid_medi = $deta_prod[$i]->{'U. MEDIDA'};
            $cant_prod = $deta_prod[$i]->CANTIDAD;


            $prec_neto = $deta_prod[$i]->{'PRECIO NETO'};
            $tota_neto = $deta_prod[$i]->{'TOTAL NETO'};
            $tota_ivaa = $deta_prod[$i]->{'TOTAL IVAA'};
            $tota_prod = $deta_prod[$i]->TOTAL;





            $query = "select MAX(cons_orde) cons_orde from comp_orde where acti_usua='$acti_usua'";

            $data_orde = $this->db->query($query);
            $data_deta = $data_orde->result();

            $cons_orde_serv = $data_deta[0]->cons_orde;

            $query = "insert into comp_orde_deta (
                        cons_orde,
                        codi_prod,
                        nomb_prod,
                        cant_prod,
                        unid_medi,
                   
                        prec_neto,
                        tota_neto,
                        tota_ivaa,
                        tota_prod  ) 
                    values (
                    '$cons_orde_serv',
                    '$codi_prod',
                    '$nomb_prod',
                    '$cant_prod',
                    '$unid_medi',
                    '$prec_neto',
                    '$tota_neto',
                    '$tota_ivaa',
                    '$tota_prod'               
                    )";

            $this->db->query($query);
        }
    }

    function orde_cons_orde($codi_usua) {
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
        $query = "select MAX(cons_orde) cons_orde from comp_orde where acti_usua='$codi_usua'";
        $stm = $this->db->query($query);
        return $stm->result();
    }

    function orde_list($cons_orde_serv_data) {
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query = "select * from comp_orde where cons_orde='$cons_orde_serv_data'";
        $stm = $this->db->query($query);
        return $stm->result();
    }

    function orde_deta($cons_orde_serv) {
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query = "select * from comp_orde_deta where cons_orde='$cons_orde_serv' order by codi_prod asc";
        $stm = $this->db->query($query);
        return $stm->result();
    }

}
