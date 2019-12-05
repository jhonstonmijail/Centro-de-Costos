<?php

class Orde extends CI_Model {

    function __construct() {
        parent::__construct();
    }
    //okay
    public function orde_list($codi_usua) {

        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query = "SELECT cons_orde , soli_orde , corr_soli,comp_orde.cent_cost as codi_cost
                        , cont_prov ,tota_orde,tipo_mone , nume_orde , tab_cent_cost.nomb_cent as cent_cost,tab_cent_cost.codi_cent as codi
                 from comp_orde , tab_cent_cost where esta_orde = 'PEN' and  comp_orde.acti_usua = '$codi_usua' and tab_cent_cost.nume_cent = comp_orde.cent_cost limit 5";
        $stm = $this->db->query($query);
        return $stm->result();
    }
    
    public function orde_list_esta($codi_usua,$esta_orde){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query = "SELECT cons_orde , soli_orde , corr_soli,comp_orde.cent_cost as codi_cost
                        , cont_prov ,tota_orde,tipo_mone , nume_orde , tab_cent_cost.nomb_cent as cent_cost,tab_cent_cost.codi_cent as codi
                 from comp_orde , tab_cent_cost where esta_orde = '$esta_orde' and  comp_orde.acti_usua = '$codi_usua' and tab_cent_cost.nume_cent = comp_orde.cent_cost limit 5";
        $stm = $this->db->query($query);
        return $stm->result();
    }

    public function apro_orde_list() {
        //return $query->result_array();
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query = "select cons_orde,nomb_soli,mail_soli,comp_orde.cent_cost as codi_cost,cont_prov,tota_orde,tipo_mone,comp_orde.nume_seri,cent_cost.cent_cost"
                . " from comp_orde,cent_cost where comp_orde.cent_cost = cent_cost.codi_cent and comp_orde.cons_orde in ('61','62','63','64','65','66')";
        $stm = $this->db->query($query);
        return $stm->result();
    }
    //okay
    public function orde_actu($cons_orde, $esta_orde) {


        $query = "update comp_orde set esta_orde='$esta_orde', acti_hora_apro=NOW() where cons_orde='$cons_orde'";
        $this->db->query($query);
        return '';
    }
    //okay
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
    
    function orde_esta($cons_orde){
        $query_dirty = "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);

        $query = "SELECT
                        esta_orde ";
        $query .= "FROM comp_orde ";
        $query .= "WHERE  cons_orde = '$cons_orde' ";

      
        $stm = $this->db->query($query);
        return $stm->result();
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

    function orde_envia($cons_orde) {
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

    function orde_lista($cons_orde_serv_data) {
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
