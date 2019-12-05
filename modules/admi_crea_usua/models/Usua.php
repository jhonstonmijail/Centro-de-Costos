<?php
class Usua extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function usua_sele($nume_iden){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        
                        nume_iden,
                        nomb_usua,
                        apel_usua,
                        codi_usua,
                        clav_usua,
                        esta_usua,
                        corr_usua,
                        telf_usua,
                        area_usua,
                        carg_usua,
                        perf_usua,
                        fech_ingr
                        
                          ";
        $query .= "FROM tab_usua ";
        $query .= "WHERE nume_iden='$nume_iden' ";
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function usua_deta_list(){
         $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                       
                        nume_iden,
                        nomb_usua,
                        apel_usua,
                        codi_usua,
                        
                        esta_usua
                   
                          ";
        $query .= "FROM tab_usua ";
        
        
        $stm = $this->db->query($query);
        return $stm->result();
    }
    
    function usua_regi($nume_iden, $nomb_usua, $apel_usua, $corr_usua,$telf_usua,$fech_ingr_usua,$area_usua,$carg_usua,$perf_usua,$codi_usua, $clav_usua, $esta_usua, $acti_usua, $esta_form){
         if($esta_form == 0){
            $query  = "insert into tab_usua (nume_iden,nomb_usua,apel_usua,codi_usua,clav_usua,esta_usua,corr_usua,telf_usua,area_usua,carg_usua,perf_usua,fech_ingr ,acti_usua,acti_hora) ";
            $query .= "values ('$nume_iden','$nomb_usua','$apel_usua','$codi_usua','$clav_usua','$esta_usua','$corr_usua','$telf_usua','$area_usua','$carg_usua','$perf_usua','$fech_ingr_usua','$acti_usua',NOW())";
            
        }else{
            $query  = "update tab_usua set codi_usua= '$codi_usua',nomb_usua = '$nomb_usua', apel_usua = '$apel_usua', clav_usua = '$clav_usua', ";
            $query .= "esta_usua = '$esta_usua', corr_usua = '$corr_usua',telf_usua = '$telf_usua',area_usua = '$area_usua', carg_usua = '$carg_usua', perf_usua = '$perf_usua' ,fech_ingr = '$fech_ingr_usua' ,acti_hora = NOW(), acti_usua = '$acti_usua'  ";
            $query .= "where nume_iden = '$nume_iden' ";    
        }
        $this->db->query($query);
        return "";
    }
}