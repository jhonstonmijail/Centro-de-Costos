<?php
    class Clie extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function clie_sele($nume_rucc){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        
                        *
                        
                          ";
        $query .= "FROM tab_clie ";
        $query .= "WHERE cons_clie='$nume_rucc' ";
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function clie_deta_list(){
         $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                       
                       *
                   
                          ";
        $query .= "FROM tab_clie ";
        
        
        $stm = $this->db->query($query);
        return $stm->result();
    }
    
    function clie_regi($codi_clie, $nomb_clie,$cont_clie, $telf_clie, $corr_clie, $esta_clie, $acti_usua, $esta_form){
         if($esta_form == 0){
            $query  = "insert into tab_clie (nomb_clie,cont_clie,telf_clie,corr_clie,esta_clie ,acti_usua,acti_hora) ";
            $query .= "values ('$nomb_clie','$cont_clie','$telf_clie','$corr_clie','$esta_clie','$acti_usua',NOW())";
            
        }else{
            $query  = "update tab_clie set nomb_clie= '$nomb_clie', telf_clie = '$telf_clie', cont_clie = '$cont_clie', ";
            $query .= "esta_clie = '$esta_clie', corr_clie = '$corr_clie',acti_hora = NOW(), acti_usua = '$acti_usua'  ";
            $query .= "where cons_clie = '$codi_clie' ";    
        }
        $this->db->query($query);
        return "";
    }
}