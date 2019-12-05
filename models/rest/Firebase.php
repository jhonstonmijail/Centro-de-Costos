<?php
class Firebase extends CI_Model{
    function __construct(){
        parent::__construct(); 
    }
     function firebase_sele(){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        codi_empr_usua,
                        toke_usua
                       
                      
                        
                          ";
        $query .= "FROM  usua_clav_noti ";
       
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function usua_regi($codi_empr_usua,$toke_usua,$acti_usua){
        $query  = "INSERT INTO usua_clav_noti (     codi_empr_usua,
                                                    toke_usua,
                                                    acti_usua,
                                                    acti_hora)  
                    VALUES ('$codi_empr_usua','$toke_usua','$acti_usua',now())";
        $this->db->query($query);    
        
    }
    function firebase_usua_sele($codi_empr_usua){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        codi_empr_usua,
                        toke_usua
                       
                      
                        
                          ";
        $query .= "FROM  usua_clav_noti where codi_empr_usua='$codi_empr_usua'";
       
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function usua_actu($codi_empr_usua,$toke_usua,$acti_usua){
          $query  = "update usua_clav_noti set toke_usua='$toke_usua' where codi_empr_usua='$codi_empr_usua'";
          $this->db->query($query); 
    }
    function firebase_usua_veri($codi_empr_usua,$clav_empr_usua){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
         $query  = "select tab_empr_usua.cons_empr_usua,tab_empr_usua.nume_iden,tab_empr_usua.nomb_empr_usua , tab_empr_usua.apel_empr_usua ,nomb_tipo_usua ,tipo_usua_movi.codi_empr_usua,tab_empr_usua.imag_perf 
                          ";
        $query .= "from tipo_usua_movi , tab_tipo_usua,tab_empr_usua where tipo_usua_movi.codi_empr_usua='$codi_empr_usua' and tipo_usua_movi.clav_empr_usua ='$clav_empr_usua' and tipo_usua_movi.esta_usua= 'ACT'"
                . " and tab_tipo_usua.cons_tipo_usua = tipo_usua_movi.cons_tipo_usua and tab_empr_usua.codi_empr_usua = tipo_usua_movi.codi_empr_usua";
       
        
        $stm = $this->db->query($query);
        return $stm->result();
    }
}