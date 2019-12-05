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
                        tipo_mone ";
        $query .= "FROM comp_orde,tab_cent_cost ";
        $query .= "WHERE esta_orde = 'PEN' and apro_orde = '$acti_usua' and cent_cost = nume_cent ";

        $query .= "ORDER by  cons_orde desc ";
        $stm = $this->db->query($query);
        return $stm->result();
    }

    function orde_regi($cons_orde, $acti_usua, $esta_apro) {
        $query_dirty = "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);

        $query = "UPDATE comp_orde set esta_orde = '$esta_apro' , "
                . " acti_hora_apro = now() where cons_orde = '$cons_orde'";
        $this->db->query($query);

        return "";
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
