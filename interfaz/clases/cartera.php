<?php

class cartera{

    private $idCartera;
    private $num_Cartera;
    private $valorCartera;
    private $disponibilidad;
    private $idMetaMask;
    private $idUsuario;
    private $idMoneda;

    /**
     * criptomoneda constructor.
     * @param $idCartera
     * @param $num_Cartera
     * @param $valorCartera
     * @param $disponibilidad
     * @param $idMetaMask
     * @param $idUsuario
     * @param $idMoneda
     */
    public function __construct($idCartera, $num_Cartera, $valorCartera, $disponibilidad, $idMetaMask, $idUsuario, $idMoneda)
    {
        $this->idCartera = $idCartera;
        $this->num_Cartera = $num_Cartera;
        $this->valorCartera = $valorCartera;
        $this->disponibilidad = $disponibilidad;
        $this->idMetaMask = $idMetaMask;
        $this->idUsuario = $idUsuario;
        $this->idMoneda = $idMoneda;
    }

    /**
     * @return mixed
     */
    public function getIdCartera()
    {
        return $this->idCartera;
    }

    /**
     * @param mixed $idCartera
     */
    public function setIdCartera($idCartera)
    {
        $this->idCartera = $idCartera;
    }

    /**
     * @return mixed
     */
    public function getNumCartera()
    {
        return $this->num_Cartera;
    }

    /**
     * @param mixed $num_Cartera
     */
    public function setNumCartera($num_Cartera)
    {
        $this->num_Cartera = $num_Cartera;
    }

    /**
     * @return mixed
     */
    public function getValorCartera()
    {
        return $this->valorCartera;
    }

    /**
     * @param mixed $valorCartera
     */
    public function setValorCartera($valorCartera)
    {
        $this->valorCartera = $valorCartera;
    }

    /**
     * @return mixed
     */
    public function getDisponibilidad()
    {
        return $this->disponibilidad;
    }

    /**
     * @param mixed $disponibilidad
     */
    public function setDisponibilidad($disponibilidad)
    {
        $this->disponibilidad = $disponibilidad;
    }

    /**
     * @return mixed
     */
    public function getIdMetaMask()
    {
        return $this->idMetaMask;
    }

    /**
     * @param mixed $idMetaMask
     */
    public function setIdMetaMask($idMetaMask)
    {
        $this->idMetaMask = $idMetaMask;
    }

    /**
     * @return mixed
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    /**
     * @param mixed $idUsuario
     */
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
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
}
?>