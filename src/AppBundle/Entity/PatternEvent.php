<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PatternEvent
 *
 * @ORM\Table(name="pattern_event")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PatternEventRepository")
 */
class PatternEvent
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
     * @var Pattern
     * 
     * @ORM\ManyToOne(targetEntity="Pattern", inversedBy="patternEvents")
     * @ORM\JoinColumn(name="pattern_id", referencedColumnName="id")
     */
    private $pattern;
    
    /**
     * @var Sound
     * 
     * @ORM\ManyToOne(targetEntity="Sound", inversedBy="patternEvents")
     * @ORM\JoinColumn(name="sound_id", referencedColumnName="id")
     * @ORM\OrderBy({"position"= "ASC"})
     */
    private $sound;
    
    /**
     * @var integer
     * 
     * @ORM\Column(name="beat_index", type="integer")
     */
    private $beatIndex;
    
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
     * Set pattern
     *
     * @param \AppBundle\Entity\Pattern $pattern
     * @return PatternEvent
     */
    public function setPattern(\AppBundle\Entity\Pattern $pattern = null)
    {
        $this->pattern = $pattern;

        return $this;
    }

    /**
     * Get pattern
     *
     * @return \AppBundle\Entity\Pattern 
     */
    public function getPattern()
    {
        return $this->pattern;
    }

    /**
     * Set sound
     *
     * @param \AppBundle\Entity\Sound $sound
     * @return PatternEvent
     */
    public function setSound(\AppBundle\Entity\Sound $sound = null)
    {
        $this->sound = $sound;

        return $this;
    }

    /**
     * Get sound
     *
     * @return \AppBundle\Entity\Sound 
     */
    public function getSound()
    {
        return $this->sound;
    }

    /**
     * Set beatIndex
     *
     * @param integer $beatIndex
     * @return PatternEvent
     */
    public function setBeatIndex($beatIndex)
    {
        $this->beatIndex = $beatIndex;

        return $this;
    }

    /**
     * Get beatIndex
     *
     * @return integer 
     */
    public function getBeatIndex()
    {
        return $this->beatIndex;
    }
}
