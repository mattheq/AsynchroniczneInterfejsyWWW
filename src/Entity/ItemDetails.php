<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ItemDetailsRepository")
 * @ApiResource(
 *     collectionOperations={
 *          "get"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
 *          }
 *     },
 *     itemOperations={
 *          "get"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
 *          },
 *          "delete"={
 *              "method"="DELETE",
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY')  and object.user == user",
 *              "access_control_message"="Sorry, but you are not the owner."
 *          },
 *          "put"={
 *              "method"="PUT"
 *          }
 *     }
 * )
 */
class ItemDetails
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"item"})
     */
    private $id;

    /**
     * @var Item
     * @ORM\OneToOne(targetEntity="Item", mappedBy="item_details")
     */
    private $item;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"item"})
     */
    private $country;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     * @Groups({"item"})
     */
    private $city;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"item"})
     */
    private $street;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"item"})
     */
    private $street_number;

    /**
     * @var int
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"item"})
     */
    private $daytime;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     * @Gedmo\Timestampable(on="create")
     * @Groups({"item"})
     */
    private $created_at;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     * @Gedmo\Timestampable(on="update")
     * @Groups({"item"})
     */
    private $updated_at;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return Item
     */
    public function getItem()
    {
        return $this->item;
    }

    /**
     * @param Item $item
     */
    public function setItem(Item $item): void
    {
        $this->item = $item;
    }

    /**
     * @return string
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param string $country
     */
    public function setCountry(string $country): void
    {
        $this->country = $country;
    }

    /**
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param string $city
     */
    public function setCity(string $city): void
    {
        $this->city = $city;
    }

    /**
     * @return string
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * @param string $street
     */
    public function setStreet(string $street): void
    {
        $this->street = $street;
    }

    /**
     * @return string
     */
    public function getStreetNumber()
    {
        return $this->street_number;
    }

    public function getStreet_number()
    {
        return $this->street_number;
    }

    /**
     * @param string $street_number
     */
    public function setStreetNumber(string $street_number): void
    {
        $this->street_number = $street_number;
    }

    /**
     * @return int
     */
    public function getDaytime()
    {
        return $this->daytime;
    }

    /**
     * @param int $daytime
     */
    public function setDaytime(int $daytime): void
    {
        $this->daytime = $daytime;
    }

    /**
     * @return int
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param int $created_at
     */
    public function setCreatedAt(int $created_at): void
    {
        $this->created_at = $created_at;
    }

    /**
     * @return int
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param int $updated_at
     */
    public function setUpdatedAt(int $updated_at): void
    {
        $this->updated_at = $updated_at;
    }

}
