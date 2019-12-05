<?php
class Carg extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function carg_list(){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        
                        *
                        
                          ";
        $query .= "FROM tab_carg ";
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
}