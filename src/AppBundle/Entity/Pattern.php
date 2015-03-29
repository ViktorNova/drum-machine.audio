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
	 * Constants for the timeSignatureDown attribute (its values)
	 */
	const TIME_SIGNATURE_DOWN_WHOLE_NOTE = 1;
	const TIME_SIGNATURE_DOWN_HALF_NOTE = 2;
	const TIME_SIGNATURE_DOWN_QUARTER_NOTE = 4;
	const TIME_SIGNATURE_DOWN_EIGHTH_NOTE = 8;
	const TIME_SIGNATURE_DOWN_SIXTEENTH_NOTE = 16;

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
     * @ORM\Column(name="slug", type="string", unique=true)
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
     * @ORM\Column(name="time_signature_up", type="integer")
     */
    private $timeSignatureUp;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="time_signature_down", type="integer")
     */
    private $timeSignatureDown;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="beat_depth", type="integer")
     */
    private $beatDepth;
    
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


    /**
     * Set timeSignatureUp
     *
     * @param integer $timeSignatureUp
     * @return Pattern
     */
    public function setTimeSignatureUp($timeSignatureUp)
    {
        $this->timeSignatureUp = $timeSignatureUp;

        return $this;
    }

    /**
     * Get timeSignatureUp
     *
     * @return integer 
     */
    public function getTimeSignatureUp()
    {
        return $this->timeSignatureUp;
    }

    /**
     * Set timeSignatureDown
     *
     * @param integer $timeSignatureDown
     * @return Pattern
     */
    public function setTimeSignatureDown($timeSignatureDown)
    {
        $this->timeSignatureDown = $timeSignatureDown;

        return $this;
    }

    /**
     * Get timeSignatureDown
     *
     * @return integer 
     */
    public function getTimeSignatureDown()
    {
        return $this->timeSignatureDown;
    }

    /**
     * Set beatDepth
     *
     * @param integer $beatDepth
     * @return Pattern
     */
    public function setBeatDepth($beatDepth)
    {
        $this->beatDepth = $beatDepth;

        return $this;
    }

    /**
     * Get beatDepth
     *
     * @return integer 
     */
    public function getBeatDepth()
    {
        return $this->beatDepth;
    }
}
