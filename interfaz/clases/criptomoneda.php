<?php

class criptomoneda{

    private $idMoneda;
    private $nombre;
    private $valorActual;
    private $servidorDisponible;

    /**
     * criptomoneda constructor.
     * @param $idMoneda
     * @param $nombre
     * @param $valorActual
     * @param $servidorDisponible
     */
    public function __construct($idMoneda, $nombre, $valorActual, $servidorDisponible)
    {
        $this->idMoneda = $idMoneda;
        $this->nombre = $nombre;
        $this->valorActual = $valorActual;
        $this->servidorDisponible = $servidorDisponible;
    }

    /**
     * @return mixed
     */
    public function getIdMoneda()
    {
        return $this->idMoneda;
    }

    /**
     * @param mixed $idMoneda
     */
    public function setIdMoneda($idMoneda)
    {
        $this->idMoneda = $idMoneda;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getValorActual()
    {
        return $this->valorActual;
    }

    /**
     * @param mixed $valorActual
     */
    public function setValorActual($valorActual)
    {
        $this->valorActual = $valorActual;
    }

    /**
     * @return mixed
     */
    public function getServidorDisponible()
    {
        return $this->servidorDisponible;
    }

    /**
     * @param mixed $servidorDisponible
     */
    public function setServidorDisponible($servidorDisponible)
    {
        $this->servidorDisponible = $servidorDisponible;
    }
}
?>