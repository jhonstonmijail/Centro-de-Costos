<?php
class Usua extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function usua_sele($codi_usua = ''){
        $query_dirty = "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        codi_usua,
                        nomb_usua ,
                        apel_usua ";
        $query .= "FROM tab_usua ";
        $query .= "WHERE esta_usua = 'ACT' ";
        if($codi_usua != ""){
            $query .= "and codi_usua = '$codi_usua' ";
        }
        $query .= "ORDER by codi_usua ";
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function usua_prog_sele($codi_usua){
        $query_dirty = "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        tab_prog.codi_prog,
                        tab_prog.nomb_prog,
                        tab_prog.ruta_prog ";
        $query .= "FROM prog_usua, tab_prog ";
        $query .= "WHERE prog_usua.codi_usua = '$codi_usua' and tab_prog.esta_prog = 'ACT' and prog_usua.cons_prog = tab_prog.cons_prog  ";
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function usua_prog_elim($codi_usua){
       
        $query  = "DELETE FROM prog_usua ";
        $query .= "WHERE codi_usua = '$codi_usua' ";
        $this->db->query($query);
        return "";
    } 
    
    function usua_prog_regi($codi_usua,$codi_usua_copi,$acti_usua,$rand){
        $query_dirty = "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
        $this->db->query($query_dirty);
        
        $query  = "select codi_usua,cons_prog into x1$rand FROM prog_usua ";
        $query .= "WHERE codi_usua = '$codi_usua' ";
        $this->db->query($query);
        
        $query = "UPDATE x1$rand set codi_usua = '$codi_usua_copi'";
        $this->db->query($query);
        

        $query = "INSERT into prog_usua select codi_usua, cons_prog, '$acti_usua', getdate() from x1$rand";
        $this->db->query($query);
        
        $query = "DROP TABLE x1$rand";
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