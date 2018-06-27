<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Filter\SearchAnnotation as Searchable;
use App\Filter\SearchFilter;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Controller\CreateItemAction;

/**
 * TODO: Add item photo and address details
 * @ORM\Entity(repositoryClass="App\Repository\ItemRepository")
 * @ApiResource(
 *     attributes={
 *          "normalization_context"={
 *              "groups"={"item"}
 *          },
 *          "filters"={"search"}
 *     },
 *     collectionOperations={
 *          "get"={
 *              "pagination_items_per_page"=12,
 *              "access_control"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
 *          },
 *          "post"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY')",
 *              "method"="POST",
 *              "path"="/items",
 *              "controller"=CreateItemAction::class,
 *              "defaults"={"_api_receive"=false},
 *          }
 *     },
 *     itemOperations={
 *          "get"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
 *          },
 *          "delete"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object.user == user",
 *              "access_control_message"="Sorry, but you are not the owner."
 *          },
 *          "put"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object.user == user",
 *              "access_control_message"="Sorry, but you are not the owner."
 *          }
 *     }
 * )
 * @Searchable({"title", "description"})
 */
class Item
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"item"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups({"item"})
     */
    private $title;

    /**
     * @var string
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @Groups({"item"})
     */
    private $description;

    /**
     * @var integer
     * @ORM\Column(type="smallint")
     * @Assert\NotNull()
     * @Groups({"item"})
     */
    private $type;

    /**
     * @var integer
     * @ORM\Column(type="smallint")
     * @Assert\NotNull()
     * @Groups({"item"})
     */
    private $status = 0;

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
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="items", cascade={"persist"})
     * @Groups({"item"})
     */
    private $user;

    /**
     * @var ItemPhoto[]
     * @ORM\OneToMany(targetEntity="ItemPhoto", mappedBy="item", cascade={"persist"})
     * @Groups({"item"})
     */
    private $photos;

    /**
     * @var UploadedFile[]|null
     * @Assert\NotNull()
     * @Vich\UploadableField(mapping="item_photo", fileNameProperty="name")
     */
    private $files;

    /**
     * @var ItemDetails
     * @ORM\OneToOne(targetEntity="ItemDetails", inversedBy="item", cascade={"persist"})
     * @Groups({"item"})
     */
    private $item_details;

    /**
     * Item constructor.
     */
    public function __construct()
    {
        $this->photos = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param int $type
     */
    public function setType(int $type): void
    {
        $this->type = $type;
    }

    /**
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus(int $status): void
    {
        $this->status = $status;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    /**
     * @return int
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @return int
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    public function getCreated_at()
    {
        return $this->created_at;
    }

    public function getUpdated_at()
    {
        return $this->updated_at;
    }

    /**
     * @return ItemPhoto[]
     */
    public function getPhotos()
    {
        return $this->photos;
    }

    /**
     * @param ItemPhoto[] $photos
     */
    public function setPhotos(array $photos): void
    {
        $this->photos = $photos;
    }

    /**
     * @return File[]
     */
    public function getFiles()
    {
        return $this->files;
    }

    /**
     * @param File[] $files
     */
    public function setFiles($files): void
    {
        $this->files = $files;
    }

    /**
     * @return ItemDetails
     */
    public function getItemDetails()
    {
        return $this->item_details;
    }

    /**
     * @param ItemDetails $item_details
     */
    public function setItemDetails(ItemDetails $item_details): void
    {
        $this->item_details = $item_details;
    }

    /**
     * @ORM\PreFlush()
     */
    public function upload()
    {
        foreach($this->files as $file)
        {
            $photo = new ItemPhoto();

            /*
             * These lines could be moved to the File Class constructor to factorize
             * the File initialization and thus allow other classes to own Files
             */
            $path = sha1(uniqid(mt_rand(), true)).'.'. $file->guessExtension();
            $photo->setName($path);
            $photo->setSize($file->getClientSize());
            $photo->setOriginalName($file->getClientOriginalName());

            $file->move($this->getUploadRootDir(), $path);

            $this->getPhotos()->add($photo);
            $photo->setItem($this);

            unset($file);
        }
    }

    protected function getUploadRootDir()
    {
        return __DIR__.'/../../public/'.$this->getUploadDir();
    }

    protected function getUploadDir()
    {
        return 'media';
    }

}
