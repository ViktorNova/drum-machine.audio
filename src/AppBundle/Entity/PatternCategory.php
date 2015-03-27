<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PatternCategory
 *
 * @ORM\Table(name="pattern_category")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PatternCategoryRepository")
 */
class PatternCategory
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
     * @ORM\Column(name="label", type="string", unique=true)
     */
    private $label;
    
    /**
     * @ORM\OneToMany(targetEntity="Pattern", mappedBy="patternCategory")
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
     * Constructor
     */
    public function __construct()
    {
        $this->patterns = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set label
     *
     * @param string $label
     * @return PatternCategory
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
     * Add patterns
     *
     * @param \AppBundle\Entity\Pattern $patterns
     * @return PatternCategory
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
}
