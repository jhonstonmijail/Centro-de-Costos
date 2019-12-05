<?php
class Perf extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function perf_list(){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        
                        *
                        
                          ";
        $query .= "FROM tab_perf ";
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
}