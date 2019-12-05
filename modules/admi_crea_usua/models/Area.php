<?php
class Area extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function area_list(){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        
                        *
                        
                          ";
        $query .= "FROM tab_area ";
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
}