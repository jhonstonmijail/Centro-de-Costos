<?php
    class Prov extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function prov_sele($nume_rucc){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        
                        *
                        
                          ";
        $query .= "FROM tab_prov ";
        $query .= "WHERE nume_rucc='$nume_rucc' ";
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function prov_deta_list(){
         $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                       
                       *
                   
                          ";
        $query .= "FROM tab_prov ";
        
        
        $stm = $this->db->query($query);
        return $stm->result();
    }
    
    function prov_regi($nume_rucc, $nomb_prov, $dire_prov, $telf_prov, $cont_prov, $acti_prov, $corr_prov, $esta_prov, $acti_usua, $esta_form){
         if($esta_form == 0){
            $query  = "insert into tab_prov (nume_rucc,nomb_prov,dire_prov,telf_prov,cont_prov,acti_prov,corr_prov,esta_prov ,acti_usua,acti_hora) ";
            $query .= "values ('$nume_rucc','$nomb_prov','$dire_prov','$telf_prov','$cont_prov','$acti_prov','$corr_prov','$esta_prov','$acti_usua',NOW())";
            
        }else{
            $query  = "update tab_prov set nomb_prov= '$nomb_prov',dire_prov = '$dire_prov', telf_prov = '$telf_prov', cont_prov = '$cont_prov', ";
            $query .= "esta_prov = '$esta_prov', corr_prov = '$corr_prov',acti_prov = '$acti_prov' ,acti_hora = NOW(), acti_usua = '$acti_usua'  ";
            $query .= "where nume_rucc = '$nume_rucc' ";    
        }
        $this->db->query($query);
        return "";
    }
}