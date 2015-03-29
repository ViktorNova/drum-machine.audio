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
     * @var \UserBundle\Entity\User
     *
     * @ORM\OneToOne(targetEntity="\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity="PatternEvent", mappedBy="sound")
     */
    private $patternEvents;

    public function toSimpleArray() {
    	return array(
    			"id" => $this->getId(),
    			"slug" => $this->getSlug(),
    			"label" => $this->getLabel(),
    			"isPublic" => $this->getIsPublic(),
    			"isDefault" => $this->getIsDefault(),
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

    /**
     * Set isPublic
     *
     * @param boolean $isPublic
     * @return Sound
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
     * @return Sound
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
     * @param \UserBundle\Entity\User $user
     * @return Sound
     */
    public function setUser(\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }
}
