<?php

class Orde extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function orde_sele($acti_usua) {
        $query_dirty = "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);

        $query = "SELECT
                        cons_orde, 
                        soli_orde,
                        prov_orde,
                        nomb_cent,
                        codi_cent,
                        nume_orde,
                        cond_pago,
                        tota_orde,
                        tipo_mone ,
                        esta_orde ";
        $query .= "FROM comp_orde,tab_cent_cost ";
        $query .= "WHERE  comp_orde.acti_usua = '$acti_usua' and cent_cost = nume_cent ";

        $query .= "ORDER by  cons_orde desc ";
        $stm = $this->db->query($query);
        return $stm->result();
    }

   

    function orde_envi($cons_orde) {
        $query_dirty = "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);

        $query = "SELECT
                        cons_orde, 
                        corr_soli,
                        soli_orde,
                        prov_orde,
                        nomb_cent,
                        codi_cent,
                        nume_orde,
                        cont_prov,
                        corr_prov ";
        $query .= "FROM comp_orde,tab_cent_cost ";
        $query .= "WHERE  cons_orde = '$cons_orde' and cent_cost = nume_cent ";

        $query .= "ORDER by  cons_orde asc ";
        $stm = $this->db->query($query);
        return $stm->result();
    }

}
