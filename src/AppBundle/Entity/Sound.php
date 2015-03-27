<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Sound
 *
 * @ORM\Table(name="sound")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\SoundRepository")
 */
class Sound
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
     * @ORM\Column(name="slug", type="string", unique=true)
     */
    private $slug;
    
    /**
     * @var string
     * 
     * @ORM\Column(name="label", type="string", unique=true)
     */
    private $label;
    
    /**
     * @var integer
     * 
     * @ORM\Column(name="position", type="integer")
     */
    private $position;

    /**
     * @ORM\OneToMany(targetEntity="PatternEvent", mappedBy="sound")
     */
    private $patternEvents;

    public function toSimpleArray() {
    	return array(
    			"id" => $this->getId(),
    			"slug" => $this->getSlug(),
    			"label" => $this->getLabel(),
    			"position" => $this->getPosition(),
    	);
    }
    
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
     * Set label
     *
     * @param string $label
     * @return Sound
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
     * @return Sound
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
     * Set position
     *
     * @param integer $position
     * @return Sound
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
     * Set slug
     *
     * @param string $slug
     * @return Sound
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
}
