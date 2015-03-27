<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Palo
 *
 * @ORM\Table(name="palo")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PaloRepository")
 */
class Palo
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     * 
     * @ORM\Column(name="position", type="integer")
     */
    private $position;
    
    /**
     * @var string
     * 
     * @ORM\Column(name="label", type="string")
     */
    private $label;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string")
     */
    private $description;
    
    /**
     * @var integer
     * 
     * @ORM\Column(name="nb_beats", type="integer")
     */
    private $nbBeats;
    
    /**
     * @ORM\ManyToMany(targetEntity="Pattern", inversedBy="palos")
     * @ORM\JoinTable(name="pattern_palo",
     * 	   joinColumns={@ORM\JoinColumn(name="palo_id", referencedColumnName="id", unique=true)},
     * 	   inverseJoinColumns={@ORM\JoinColumn(name="pattern_id", referencedColumnName="id", unique=true)}
     * )
     */
    private $patterns;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set position
     *
     * @param integer $position
     * @return Palo
     */
    public function setPosition($position)
    {
        $this->position = $position;

        return $this;
    }

    /**
     * Get position
     *
     * @return integer 
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Set label
     *
     * @param string $label
     * @return Palo
     */
    public function setLabel($label)
    {
        $this->label = $label;

        return $this;
    }

    /**
     * Get label
     *
     * @return string 
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Palo
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->patterns = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add patterns
     *
     * @param \AppBundle\Entity\Pattern $patterns
     * @return Palo
     */
    public function addPattern(\AppBundle\Entity\Pattern $patterns)
    {
        $this->patterns[] = $patterns;

        return $this;
    }

    /**
     * Remove patterns
     *
     * @param \AppBundle\Entity\Pattern $patterns
     */
    public function removePattern(\AppBundle\Entity\Pattern $patterns)
    {
        $this->patterns->removeElement($patterns);
    }

    /**
     * Get patterns
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPatterns()
    {
        return $this->patterns;
    }

    /**
     * Set nbBeats
     *
     * @param integer $nbBeats
     * @return Palo
     */
    public function setNbBeats($nbBeats)
    {
        $this->nbBeats = $nbBeats;

        return $this;
    }

    /**
     * Get nbBeats
     *
     * @return integer 
     */
    public function getNbBeats()
    {
        return $this->nbBeats;
    }
}
