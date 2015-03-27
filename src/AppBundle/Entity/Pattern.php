<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Pattern
 *
 * @ORM\Table(name="pattern")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PatternRepository")
 */
class Pattern
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
     * @var string
     * 
     * @ORM\Column(name="slug", type="string")
     */
    private $slug;
    
    /**
     * @var string
     * 
     * @ORM\Column(name="label", type="string")
     */
    private $label;
    
    /**
     * @var string
     * 
     * @ORM\Column(name="description", type="text")
     */
    private $description;
    
    /**
     * @var integer
     * 
     * @ORM\Column(name="nb_beats_in_cell", type="integer")
     */
    private $nbBeatsInCell;
    
    /**
     * @var boolean
     * 
     * @ORM\Column(name="is_public", type="boolean")
     */
    private $isPublic;
    
    /**
     * @var boolean
     * 
     * @ORM\Column(name="is_default", type="boolean")
     */
    private $isDefault;
    
    /**
     * @var integer
     * 
     * @ORM\Column(name="nb_cell", type="integer")
     */
    private $nbCell;
    
    /**
     * @var \UserBundle\Entity\User
     * 
     * @ORM\OneToOne(targetEntity="\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @var PatternCategory
     *
     * @ORM\ManyToOne(targetEntity="PatternCategory", inversedBy="patterns")
     * @ORM\JoinColumn(name="pattern_category_id", referencedColumnName="id")
     * @ORM\OrderBy({"label"= "ASC"})
     */
    private $patternCategory;

    /**
     * @ORM\OneToMany(targetEntity="PatternEvent", mappedBy="pattern", cascade={"persist", "remove", "refresh"})
     */
    private $patternEvents;
    
    /**
     * @ORM\ManyToMany(targetEntity="Palo", mappedBy="patterns")
     */
    private $palos;

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
     * Set slug
     *
     * @param string $slug
     * @return Pattern
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Get slug
     *
     * @return string 
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set label
     *
     * @param string $label
     * @return Pattern
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
     * @return Pattern
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
        $this->patternEvents = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add patternEvents
     *
     * @param \AppBundle\Entity\PatternEvent $patternEvents
     * @return Pattern
     */
    public function addPatternEvent(\AppBundle\Entity\PatternEvent $patternEvents)
    {
        $this->patternEvents[] = $patternEvents;

        return $this;
    }

    /**
     * Remove patternEvents
     *
     * @param \AppBundle\Entity\PatternEvent $patternEvents
     */
    public function removePatternEvent(\AppBundle\Entity\PatternEvent $patternEvents)
    {
        $this->patternEvents->removeElement($patternEvents);
    }

    /**
     * Get patternEvents
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPatternEvents()
    {
        return $this->patternEvents;
    }

    /**
     * Add palos
     *
     * @param \AppBundle\Entity\Palo $palos
     * @return Pattern
     */
    public function addPalo(\AppBundle\Entity\Palo $palos)
    {
        $this->palos[] = $palos;

        return $this;
    }

    /**
     * Remove palos
     *
     * @param \AppBundle\Entity\Palo $palos
     */
    public function removePalo(\AppBundle\Entity\Palo $palos)
    {
        $this->palos->removeElement($palos);
    }

    /**
     * Get palos
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPalos()
    {
        return $this->palos;
    }

    /**
     * Set nbBeats
     *
     * @param integer $nbBeats
     * @return Pattern
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

    /**
     * Set nbBeatsInCell
     *
     * @param integer $nbBeatsInCell
     * @return Pattern
     */
    public function setNbBeatsInCell($nbBeatsInCell)
    {
        $this->nbBeatsInCell = $nbBeatsInCell;

        return $this;
    }

    /**
     * Get nbBeatsInCell
     *
     * @return integer 
     */
    public function getNbBeatsInCell()
    {
        return $this->nbBeatsInCell;
    }

    /**
     * Set nbCell
     *
     * @param integer $nbCell
     * @return Pattern
     */
    public function setNbCell($nbCell)
    {
        $this->nbCell = $nbCell;

        return $this;
    }

    /**
     * Get nbCell
     *
     * @return integer 
     */
    public function getNbCell()
    {
        return $this->nbCell;
    }

    /**
     * Set isPublic
     *
     * @param boolean $isPublic
     * @return Pattern
     */
    public function setIsPublic($isPublic)
    {
        $this->isPublic = $isPublic;

        return $this;
    }

    /**
     * Get isPublic
     *
     * @return boolean 
     */
    public function getIsPublic()
    {
        return $this->isPublic;
    }

    /**
     * Set isDefault
     *
     * @param boolean $isDefault
     * @return Pattern
     */
    public function setIsDefault($isDefault)
    {
        $this->isDefault = $isDefault;

        return $this;
    }

    /**
     * Get isDefault
     *
     * @return boolean 
     */
    public function getIsDefault()
    {
        return $this->isDefault;
    }

    /**
     * Set user
     *
     * @param \userBundle\Entity\User $user
     * @return Pattern
     */
    public function setUser(\userBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \userBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set patternCategory
     *
     * @param \AppBundle\Entity\PatternCategory $patternCategory
     * @return Pattern
     */
    public function setPatternCategory(\AppBundle\Entity\PatternCategory $patternCategory = null)
    {
        $this->patternCategory = $patternCategory;

        return $this;
    }

    /**
     * Get patternCategory
     *
     * @return \AppBundle\Entity\PatternCategory 
     */
    public function getPatternCategory()
    {
        return $this->patternCategory;
    }
}
