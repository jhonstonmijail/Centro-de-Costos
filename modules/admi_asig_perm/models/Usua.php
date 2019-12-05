<?php
class Usua extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function usua_sele($codi_usua){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        codi_usua ";
        $query .= "FROM tab_usua ";
        $query .= "WHERE codi_usua = '$codi_usua' and esta_usua = 'ACT' ";
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function usua_prog_sele($codi_usua){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        tab_prog.cons_prog,
                        tab_prog.codi_prog,
                        tab_prog.nomb_prog,
                        tab_prog.ruta_prog ";
        $query .= "FROM prog_usua, tab_prog ";
        $query .= "WHERE prog_usua.codi_usua = '$codi_usua' and tab_prog.esta_prog = 'ACT' and prog_usua.cons_prog= tab_prog.cons_prog  ";
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function usua_prog_elim($codi_usua){
        $query = "DELETE from prog_usua where codi_usua = '$codi_usua' ";
        $this->db->query($query);
        return "";
    }
    function usua_prog_regi($codi_usua,$cons_prog,$acti_usua){
        $query  = "INSERT INTO prog_usua (codi_usua,cons_prog,acti_usua,acti_hora) ";
        $query .= "VALUES ('$codi_usua','$cons_prog','$acti_usua',NOW()) ";
        
        $this->db->query($query);
        return "";
    }
    
    function usua_list(){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        codi_usua 
                        from 
                        tab_usua ";
      
        $stm = $this->db->query($query);
        return $stm->result();
    } 
}