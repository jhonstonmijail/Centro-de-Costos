<?php

class Usua extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function usua_corr($apro_orde) {

        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query = "SELECT nomb_usua,corr_usua from tab_usua where codi_usua='$apro_orde'";
        $stm = $this->db->query($query);
        return $stm->result();
    }

    function usua_soli($codi_usua) {
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query = "SELECT nomb_usua,apel_usua,corr_usua from tab_usua where codi_usua='$codi_usua'";
        $stm = $this->db->query($query);
        return $stm->result();
    }

}
