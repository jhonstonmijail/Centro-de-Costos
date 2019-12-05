<?php
    class Cent extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function cent_sele($codi_cent){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        
                        *
                        
                          ";
        $query .= "FROM tab_cent_cost ";
        $query .= "WHERE codi_cent='$codi_cent' ";
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function cent_list(){
         $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                       
                       *
                   
                          ";
        $query .= "FROM tab_cent_cost ";
        
        
        $stm = $this->db->query($query);
        return $stm->result();
    }
    
    function cent_regi($codi_cent, $nomb_cent, $esta_cent, $acti_usua, $esta_form){
         if($esta_form == 0){
            $query  = "insert into tab_cent_cost (codi_cent,nomb_cent,esta_cent ,nume_orde_cent,acti_usua,acti_hora) ";
            $query .= "values ('$codi_cent','$nomb_cent','$esta_cent',0,'$acti_usua',NOW())";
            
        }else{
            $query  = "update tab_cent_cost set nomb_cent= '$nomb_cent', ";
            $query .= "esta_cent = '$esta_cent' ,acti_hora = NOW(), acti_usua = '$acti_usua'  ";
            $query .= "WHERE codi_cent='$codi_cent' ";   
        }
        $this->db->query($query);
        return "";
    }
}